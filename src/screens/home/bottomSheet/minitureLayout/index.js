import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import screen from "src/utils/screen";
import { useTheme } from "react-native-paper";
import assets from "src/assets";

export default () => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <Image source={assets.appIcon} style={styles.appIcon} />
      <Text style={styles.detectLabel}>Detect history</Text>
    </View>
  );
};

export const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    detectLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.black,
    },
    appIcon: {
      width: 40,
      height: 40,
      position: "absolute",
      left: 20,
    },
  });
};
