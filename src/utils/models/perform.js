import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
// import * as mobilenet from "@tensorflow-models/mobilenet";
import * as FileSystem from "expo-file-system";
// import ImgToBase64 from "react-native-image-base64";
// import * as ImagePicker from "expo-image-picker";
// import base64 from "base-64";
// import config from "./config";
// import { decode } from "base-64";
// import { Buffer } from "buffer";
import * as Clipboard from "expo-clipboard";

/**
 * init TF
 */
const init = async () => {
  try {
    await tf.ready();
    // setProgress(0.6);
    const model = await loadModel();
    return model;
  } catch (error) {
    console.log(error);
  }
};

/**
 * loadModel
 * @return {*}
 */
const loadModel = async () => {
  try {
    console.log("[INFOR] :", "loading");
    // const modelArchitectureString = await FileSystem.readAsStringAsync(
    //   config.localDir.architecture
    // );
    // const modelWeightsBuffer = await FileSystem.readAsStringAsync(
    //   config.localDir.weight,
    //   { encoding: FileSystem.EncodingType.Base64 }
    // );
    const modelArchitecture = await require("../../assets/model/model.json");
    const modelWeights = await require("../../assets/model/weight.bin");

    // const modelArchitecture = JSON.parse(modelArchitectureString);
    // const data = await FileSystem.readAsStringAsync(config.localDir.weight, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    // const modelWeights = new Uint8Array(Buffer.from(data, "base64"));
    // console.log(modelWeights)

    try {
      const model = await tf
        .loadLayersModel(bundleResourceIO(modelArchitecture, modelWeights))
        .catch((e) => {
          console.log("[LOADING ERROR] info:", e);
        });
      console.log("[Loading infor] info:", "loaded");
      return model;
    } catch (e) {
      console.log("[LOADING ERROR] info:", "failed");
      console.log(e);
    }
  } catch (error) {
    console.log(error);
  }
};

const transformImageToTensor = async (uri) => {
  try {
    const img64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(img64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);
    let imgTensor = decodeJpeg(raw);
    //resize the image
    const scaledImgTensor = tf.image.resizeNearestNeighbor(
      imgTensor,
      [224, 224]
    );
    // normalize; if a normalization layer is in the model, this step can be skipped
    // const tensorScaled = scaledImgTensor.div(tf.scalar(255));
    //final shape of the rensor
    const tensor_image = tf.reshape(scaledImgTensor, [1, 224, 224, 3]);
    return tensor_image;
  } catch (error) {
    console.log(error);
  }
};

const makePredictions = async (batch, model, imagesTensor) => {
  const predictionsdata = model.predict(imagesTensor);
  let pred = predictionsdata.arraySync();

  return pred[0];
  //   return labelList[parseInt(pred[0]?.rankType)];
};

export default {
  init,
  transformImageToTensor,
  makePredictions,
};
