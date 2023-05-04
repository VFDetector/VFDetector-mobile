import React, { useState } from "react";
import { LayoutAnimation, StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import screen from "src/utils/screen";

export default ({ label, children }) => {
  const [expand, setExpand] = useState(false);
  const { colors } = useTheme();
  const styles = useStyle();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setExpand(!expand);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{label}</Text>
      {expand && children}
      <Text style={{ color: colors.primary }}>
        {expand ? "Press to hide detail" : "Press to see detail"}
      </Text>
    </TouchableOpacity>
  );
};

export const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      width: screen.width - 40,
      justifyContent: "center",
    },
  });
};
