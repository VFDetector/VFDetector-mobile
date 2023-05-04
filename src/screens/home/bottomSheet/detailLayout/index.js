import React from "react";
import { View, StyleSheet } from "react-native";
import screen from "src/utils/screen";
import { Button, useTheme } from "react-native-paper";
import FeatureBar from "./featureBar";
import SupportDishesButton from "./supportDishesButton";
import HistoryLayout from "./history";

export default ({ bottomSheetRef }) => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <FeatureBar bottomSheetRef={bottomSheetRef} />
      <SupportDishesButton />
      <HistoryLayout />
    </View>
  );
};

const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: { flex: 1 },
  });
};
