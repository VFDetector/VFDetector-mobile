import React from "react";
import { View, Text, StyleSheet } from "react-native";
import screen from "src/utils/screen";
import { useTheme } from "react-native-paper";

export default () => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
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
    },
    detectLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.black
    },
  });
};
