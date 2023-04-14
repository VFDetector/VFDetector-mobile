import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import screen from "src/utils/screen";

export default ({ navigation, route }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          width: screen.width - 40,
          height: screen.width - 40,
          backgroundColor: colors.transparentPrimary(0.4),
        }}
      ></View>
    </View>
  );
};
