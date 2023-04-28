import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import assets from "src/assets";
import { SafeLayout } from "src/layouts";
import screen from "src/utils/screen";
import model from "src/utils/models";
// import { useQuery } from "react-query";

const AppInitiation = ({ navigation }) => {
  const { colors } = useTheme();
  const [processLabel, setProcessLabel] = useState("Checking model version");
  const init = async () => {
    const remoteVersion = await model.version.checkCurrentModelVersion();
    setProcessLabel(`Found model version ${remoteVersion}`);
    const localVersion = await model.version.getCurrentLocalVersion();
    await new Promise(async (resolve) => {
      if (remoteVersion === localVersion?.version) resolve();
      else {
        setProcessLabel("Updating process");
        const downloadModelStatus = await model.version.download(remoteVersion);
        if (downloadModelStatus == true) resolve();
      }
    });
    setProcessLabel("Loading model");
    await model.perform.init();
    // navigation.replace("home");
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <SafeLayout
      edges={["bottom", "top"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Image
        style={{ width: screen.width / 3, height: screen.width / 3 }}
        source={assets.appIcon}
        resizeMode="contain"
      />
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Food Detection</Text>
      <ActivityIndicator
        style={{ marginTop: screen.width / 3 }}
        color={colors.dark}
        animating={true}
      />
      <Text style={{ marginTop: 10, fontWeight: "bold" }}>{processLabel}</Text>
    </SafeLayout>
  );
};
export default AppInitiation;
