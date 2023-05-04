import * as FileSystem from "expo-file-system";
import config from "./config";

const process = async (updateMetadata) => {
  try {
    const fileContents = await FileSystem.readAsStringAsync(
      config.localDir.config
    );
    const metadata = JSON.parse(fileContents);
    updateMetadata(metadata);
  } catch (error) {
    console.log(error);
  }
};

const fetchMetadata = async (version, setProcessLabel) => {
  try {
    const fileContents = await FileSystem.readAsStringAsync(
      config.localDir.config
    );
    const metadata = JSON.parse(fileContents);
    await createAssetDirectory();
    await downloadAssets(metadata?.assets, version, setProcessLabel);
  } catch (error) {
    console.log(error);
  }
};

const downloadAssets = async (number, version, setProcessLabel) => {
  try {
    for (let i = 1; i <= number; i++) {
      const filename = `${i < 10 ? `0${i}` : i}.png`;
      const downloadUrl = config.asset(version, filename);
      await downloadFile(
        downloadUrl,
        config.localDir.asset(filename),
        (process) => {
          setProcessLabel(`Fetching data ${i}/${number}(${process}%)`);
        }
      );
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

const createAssetDirectory = async () => {
  return new Promise(async (resolve) => {
    try {
      while (true) {
        const dirInfo = await FileSystem.getInfoAsync(config.localDir.assets);
        // If the directory exists, return
        if (dirInfo.exists && dirInfo.isDirectory) {
          resolve(true);
        } else {
          // If the directory doesn't exist, create it
          const assetDirectory = await FileSystem.makeDirectoryAsync(
            config.localDir.assets,
            {
              intermediates: true,
            }
          );
          console.log("Created directory:", assetDirectory?.uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};
export default { process, fetchMetadata };
