import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import assets from "src/assets";
import { useModelState } from "src/contexts/modelContext";
import { SafeLayout } from "src/layouts";
import model from "src/utils/models";
import screen from "src/utils/screen";
import { useKeepAwake } from "expo-keep-awake";

const AppInitiation = ({ navigation }) => {
  const { colors } = useTheme();
  const { setModel, updateMetadata } = useModelState();
  const styles = useStyle();
  const [processLabel, setProcessLabel] = useState("Checking model version");
  useKeepAwake();
  const init = async () => {
    const remoteVersion = await model.version.checkCurrentModelVersion();
    setProcessLabel(`Found model version ${remoteVersion}`);
    const localVersion = await model.version.getCurrentLocalVersion();
    await new Promise(async (resolve) => {
      if (remoteVersion === localVersion?.version) resolve();
      else {
        setProcessLabel("Updating process, fetching data");
        const downloadModelStatus = await model.version.download(
          remoteVersion,
          setProcessLabel
        );
        if (downloadModelStatus == true) {
          await model.metadata.fetchMetadata(remoteVersion, setProcessLabel);
          resolve();
        }
      }
    });
    setProcessLabel("Process metadata");
    await model.metadata.process(
      updateMetadata,
      remoteVersion,
      setProcessLabel
    );
    setProcessLabel("Loading model");
    const loadedModel = await model.perform.init();
    if (loadedModel) {
      setModel(loadedModel);
      navigation?.replace("home");
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <SafeLayout edges={["bottom", "top"]} contentStyle={styles.container}>
      <Image
        style={styles.appIcon}
        source={assets.appIcon}
        resizeMode="contain"
      />
      <Text style={styles.appTitle}>Food Detection</Text>
      <ActivityIndicator
        style={styles.loader}
        color={colors.dark}
        animating={true}
      />
      <Text style={styles.processLabel}>{processLabel}</Text>
    </SafeLayout>
  );
};

const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    appTitle: {
      fontWeight: "bold",
      fontSize: 20,
    },
    loader: {
      marginTop: screen.width / 3,
    },
    processLabel: {
      marginTop: 10,
      fontWeight: "bold",
      textAlign: "center",
      marginHorizontal: 20,
    },
    appIcon: {
      width: screen.width / 3,
      height: screen.width / 3,
    },
  });
};
export default AppInitiation;
