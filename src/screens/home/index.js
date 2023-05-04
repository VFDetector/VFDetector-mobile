import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import { SafeLayout } from "src/layouts";
import BottomSheet from "./bottomSheet";
import CameraLayout from "./cameraLayout";
import CancelButton from "./components/cancelButton";
import CaptureButton from "./components/captureButton";
import ProfileButton from "./components/profileButton";
import RequestPermision from "./requestPermision";

export default () => {
  const [activeDetect, setActiveDetect] = useState(false);
  const [activeLayout, setActiveLayout] = useState(true);
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
      <CameraLayout permission={permission} activeDetect={activeDetect} />
      <SafeLayout
        contentStyle={{
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
