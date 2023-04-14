import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import assets from "src/assets";
import { SafeLayout } from "src/layout";
import screen from "src/utils/screen";
import model from "src/utils/models";
import { useQuery } from "react-query";
import { useLocalDatabase } from "src/contexts/localDatabase";

const AppInitiation = ({ navigation }) => {
  const { colors } = useTheme();
  const [processLabel, setProcessLabel] = useState("Checking model version");
  const { database } = useLocalDatabase();
  const init = async () => {
    const version = await model.version.checkCurrentModelVersion();
    setProcessLabel(`Found model version ${version}`);
    const localVersion = await model.version.getCurrentLocalVersion(database);
    await new Promise(async (resolve) => {
      if (version === localVersion?.version) resolve();
      else {
        setProcessLabel("Updating process");
        const downloadModelStatus = await model.version.download(
          version,
          database
        );
        if (downloadModelStatus == true) resolve();
      }
    });
    setProcessLabel("Loading model");
    await model.perform.init();
    // navigation.replace("MainTabs");
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
