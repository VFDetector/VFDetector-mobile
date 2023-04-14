import * as FileSystem from "expo-file-system";
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

const downloadFile = async (url, filePath) => {
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

const getCurrentLocalVersion = async (database) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM models ORDER BY updated_time DESC LIMIT 1;",
        [],
        (_, { rows: { _array } }) => resolve(_array[0]),
        (_, error) => reject(error)
      );
    });
  });
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

const download = async (version, database) => {
  try {
    const downloadedModel = await downloadFile(
      config.model(version),
      config.localDir.architecture
    );
    const downloadedWeight = await downloadFile(
      config.weight(version),
      config.localDir.weight
    );
    const downloadedConfig = await downloadFile(
      config.config(version),
      config.localDir.config
    );
    if (!!downloadedModel && !!downloadedWeight && !!downloadedConfig) {
      await updateNewestModel(version, new Date().toISOString(), database)
        .then((result) => console.log(result))
        .catch((error) => console.error("Error updating newest model:", error));
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