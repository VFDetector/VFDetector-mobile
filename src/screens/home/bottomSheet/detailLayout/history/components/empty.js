import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import screen from "src/utils/screen";

export default () => {
  return (
    <View
      style={{
        width: screen.width - 24,
        height: screen.width - 24,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>No history recorded</Text>
    </View>
  );
};
