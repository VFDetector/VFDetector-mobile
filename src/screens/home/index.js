import React, { useEffect, useState } from "react";
import { Text, useTheme } from "react-native-paper";
import { LayoutAnimation, StyleSheet } from "react-native";
import screen from "src/utils/screen";
import CaptureButton from "./components/captureButton";
import { SafeLayout } from "src/layouts";
import { Camera, CameraType } from "expo-camera";
import RequestPermision from "./requestPermision";
import ProfileButton from "./components/profileButton";
import CancelButton from "./components/cancelButton";
import BottomSheet from "./bottomSheet";

export default ({ navigation, route }) => {
  const { colors } = useTheme();
  const [activeDetect, setActiveDetect] = useState(false);
  const [activeLayout, setActiveLayout] = useState(true);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const checkPermission = async () => {
    if (!permission) {
      const permissionStatus = await Camera.requestCameraPermissionsAsync();
      requestPermission(permissionStatus);
    }
  };
  useEffect(() => {
    checkPermission();
  });
  if (!permission?.granted) return <RequestPermision />;
  return (
    <>
      {permission?.granted && activeDetect && (
        <Camera style={StyleSheet.absoluteFill} type={type}></Camera>
      )}
      <SafeLayout
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        edges={["top", "bottom"]}
      >
        <ProfileButton activeLayout={activeLayout} />
        <CancelButton
          activeLayout={activeLayout}
          setActiveLayout={setActiveLayout}
          onPress={() => {
            setActiveLayout(true);
            setActiveDetect(false);
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
          }}
        />
        {activeLayout && (
          <CaptureButton
            onPress={() => {
              setActiveLayout(false);
              setTimeout(() => {
                setActiveDetect(true);
              }, 200);
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
            }}
          />
        )}
      </SafeLayout>
      {activeLayout && <BottomSheet />}
    </>
  );
};
