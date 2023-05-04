import * as FileSystem from "expo-file-system";
import { Base64 } from "expo";
import api from "../api";

const remoteUrl = `http://167.172.82.176:5000/api/predict`;
const remotePredict = async (imageUri) => {
  try {
    const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const resp = await api.requests.post(remoteUrl, {
      image: `data:image/jpeg;base64,${imageBase64}`,
    });
    if (resp?.prediction) return resp;
  } catch (error) {
    console.log(error);
  }
};

export { remotePredict };
