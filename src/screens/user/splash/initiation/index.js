import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import assets from "src/assets";
import { SafeLayout } from "src/layouts";
import screen from "src/utils/screen";
import localDatabase from "src/utils/localDatabase";
import { useLocalDatabase } from "src/contexts/localDatabase";
import ModelManager from "src/utils/models";
import { useKeepAwake } from "expo-keep-awake";
import { useUserState } from "src/contexts/userContext";

const AppInitiation = ({ navigation }) => {
  const { colors } = useTheme();
  const { updateDatabase } = useLocalDatabase();
  const { initUser } = useUserState();
  const init = async () => {
    try {
      const database = await localDatabase.init();
      await initUser();
      if (database && (await ModelManager.version.checkModelDirectory())) {
        updateDatabase(database);
        navigation.replace("splash-login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useKeepAwake();
  useEffect(() => {
    init();
  }, []);
  return (
    <SafeLayout
      edges={["bottom", "top"]}
      contentStyle={{ justifyContent: "center", alignItems: "center" }}
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
      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Loading</Text>
    </SafeLayout>
  );
};
export default AppInitiation;
