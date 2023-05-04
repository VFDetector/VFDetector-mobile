import * as FileSystem from "expo-file-system";
import { get_storage_data, set_storage_data } from "src/utils/asyncStorage";
import config from "./config";

const checkCurrentModelVersion = async () => {
  try {
    const status = await downloadFile(
      config.version_remote,
      config.localDir.version
    );
    if (status === 200) {
      const version = await FileSystem.readAsStringAsync(
        config.localDir.version
      );
      return version.replace(/\n/g, "");
    }
  } catch (error) {
    console.log(error);
  }
};

const downloadFile = async (url, filePath, updateLabelProcess) => {
  try {
    // Check if the file already exists
    const fileExists = await FileSystem.getInfoAsync(filePath);

    // If the file exists, delete it before downloading the new file
    if (fileExists.exists) {
      await FileSystem.deleteAsync(filePath);
      console.log("Deleted existing file:", filePath);
    }

    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      filePath,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        if (updateLabelProcess)
          updateLabelProcess(
            progress * 100 > 1 ? (progress * 100).toFixed() : "-"
          );
        // console.log(`Download progress: ${progress * 100}%`);
      }
    );

    const { uri, status } = await downloadResumable.downloadAsync();
    console.log("Downloaded file:", status);
    return status;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const getCurrentLocalVersion = async () => {
  try {
    return JSON.parse(await get_storage_data(config.VERSION_KEY));
  } catch (error) {
    console.log(error);
  }
};

const updateNewestModel = async (newVersion, newUpdatedTime, database) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE models SET version = ?, updated_time = ? WHERE updated_time = (SELECT MAX(updated_time) FROM models);",
        [newVersion, newUpdatedTime],
        (_, { rowsAffected }) => {
          if (rowsAffected === 1) {
            resolve("Record updated successfully.");
          } else {
            tx.executeSql(
              "INSERT INTO models (version, updated_time) VALUES (?, ?);",
              [newVersion, newUpdatedTime],
              (_, { rowsAffected }) => {
                if (rowsAffected === 1) {
                  resolve("Record inserted successfully.");
                } else {
                  reject(new Error("Error inserting record."));
                }
              },
              (_, error) => reject(error)
            );
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

const download = async (version, updateLabel) => {
  try {
    const downloadedModel = await downloadFile(
      config.model(version),
      config.localDir.architecture,
      (percentage) => updateLabel(`Fetching model architecture(${percentage}%)`)
    );
    const downloadedWeight = await downloadFile(
      config.weight(version),
      config.localDir.weight,
      (percentage) => updateLabel(`Fetching model weight(${percentage}%)`)
    );
    const downloadedConfig = await downloadFile(
      config.config(version),
      config.localDir.config,
      (percentage) => updateLabel(`Fetching metadata(${percentage}%)`)
    );
    if (!!downloadedModel && !!downloadedWeight && !!downloadedConfig) {
      await set_storage_data(
        config.VERSION_KEY,
        JSON.stringify({ version, updateTime: new Date().toISOString() })
      );
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

const checkModelDirectory = async () => {
  return new Promise(async (resolve) => {
    try {
      while (true) {
        const dirInfo = await FileSystem.getInfoAsync(config.localDir.model);
        // If the directory exists, return
        if (dirInfo.exists && dirInfo.isDirectory) {
          resolve(true);
        } else {
          // If the directory doesn't exist, create it
          const modelDir = await FileSystem.makeDirectoryAsync(
            config.localDir.model,
            {
              intermediates: true,
            }
          );
          console.log("Created directory:", modelDir?.uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export default ModelManager = {
  checkCurrentModelVersion,
  download,
  getCurrentLocalVersion,
  checkModelDirectory,
};
