import { Camera, CameraType } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { ImageManipulator } from "expo-image-crop-fixed";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "react-query";
import { useLocalDatabase } from "src/contexts/localDatabase";
import { useModelState } from "src/contexts/modelContext";
import models from "src/utils/models";
import { remotePredict } from "src/utils/models/remote";
import CaptureButton from "./captureButton";
import DetectDialog from "./detectDialog";
import { updateLocalHistory } from "./utils";

export default ({ permission, activeDetect }) => {
  const insets = useSafeAreaInsets();
  const { model } = useModelState();
  const { database } = useLocalDatabase();
  const camera = useRef(null);
  const [tmpImage, setTmpImage] = useState(null);
  const [predictValue, setPredictValue] = useState(null);
  const [onEdit, setOnEdit] = useState(false);

  const captureImage = async (action) => {
    try {
      const imageUri = await new Promise(async (resolve) => {
        if (action == "capture") {
          const photo = await camera?.current?.takePictureAsync({
            quality: 0.2,
            skipProcessing: false,
          });
          resolve(photo?.uri);
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.2,
            allowsMultipleSelection: false,
          });
          if (result?.assets) resolve(result?.assets[0]?.uri);
          else resolve();
        }
      });
      if (imageUri) {
        setTmpImage(imageUri);
        setOnEdit(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { mutate, isLoading } = useMutation(async (imageUri) => {
    try {
      const prediction = await remotePredict(imageUri);
      if (prediction?.prediction) {
        updateLocalHistory(database, prediction);
        setPredictValue(prediction);
      }
    } catch (error) {
      console.log(error);
    }
  });
  const reset = () => {
    setTmpImage(null);
    setPredictValue(null);
    setOnEdit(false);
  };
  useEffect(() => {
    if (activeDetect == true) reset();
  }, [activeDetect]);
  if (permission?.granted && activeDetect)
    return (
      <>
        {onEdit && (
          <ImageManipulator
            photo={{ uri: tmpImage }}
            isVisible={onEdit}
            onPictureChoosed={(params) => {
              setOnEdit(false);
              mutate(params?.uri);
            }}
            onToggleModal={() => reset()}
          />
        )}
        {!!!tmpImage ? (
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            type={CameraType.back}
          ></Camera>
        ) : (
          <Image style={StyleSheet.absoluteFill} source={{ uri: tmpImage }} />
        )}
        {!!!tmpImage ? (
          <View
            style={{
              position: "absolute",
              zIndex: 2,
              bottom: insets.bottom + 20,
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <CaptureButton
              icon="camera-iris"
              activeLayout={false}
              onPress={() => captureImage("capture")}
            />
            <CaptureButton
              style={{ marginLeft: 10 }}
              icon="image"
              activeLayout={false}
              onPress={() => captureImage("gallery")}
            />
          </View>
        ) : (
          <DetectDialog isLoading={isLoading} predictValue={predictValue} />
        )}
      </>
    );
  else return null;
};
