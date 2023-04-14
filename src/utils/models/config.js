import * as FileSystem from "expo-file-system";
export default {
  GIT_OWNER: "VFDetector",
  REPO: "VFDetector-30VNFoods-MobilenetV2",
  version_url: ".model-version",
  version_remote: `https://raw.githubusercontent.com/VFDetector/VFDetector-30VNFoods-MobilenetV2/main/.model-version`,
  model: (version) =>
    `https://github.com/VFDetector/VFDetector-30VNFoods-MobilenetV2/raw/main/model/${version}/model.json`,
  weight: (version) =>
    `https://github.com/VFDetector/VFDetector-30VNFoods-MobilenetV2/raw/main/model/${version}/weight.bin`,
  config: (version) =>
    `https://github.com/VFDetector/VFDetector-30VNFoods-MobilenetV2/blob/main/model/${version}/config.json`,
  localDir: {
    version: `${FileSystem.documentDirectory}/model/.model-version`,
    model: `${FileSystem.documentDirectory}model`,
    architecture: `${FileSystem.documentDirectory}/model/model.json`,
    weight: `${FileSystem.documentDirectory}/model/weight.bin`,
    config: `${FileSystem.documentDirectory}/model/config.json`,
  },
};
