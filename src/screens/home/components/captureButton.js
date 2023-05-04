import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import screen from "src/utils/screen";

export default CaptureButton = ({ onPress }) => {
  const styles = useStyle();
  return (
    <>
      <Shadow startColor={`rgba(180, 180, 180, 0.2)`}>
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <Icon name="line-scan" size={screen.width / 6} color="white" />
        </TouchableOpacity>
      </Shadow>
      <Text style={styles.label}>Tap to detect your dish</Text>
    </>
  );
};
const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    buttonContainer: {
      width: screen.width / 3,
      height: screen.width / 3,
      backgroundColor: colors.primary,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      color: colors.gray,
      marginTop: 8,
    },
  });
};
