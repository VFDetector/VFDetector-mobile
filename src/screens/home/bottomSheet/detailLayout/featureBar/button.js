import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";

export default Button = ({ icon, onPress }) => {
  const styles = useStyle();
  return (
    <Shadow startColor={`rgba(180, 180, 180, 0.2)`}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Icon name={icon} size={24} color="white" />
      </TouchableOpacity>
    </Shadow>
  );
};

export const useStyle = () => {
  const { colors } = useTheme();
  const SIZE = 44;
  return StyleSheet.create({
    buttonContainer: {
      width: SIZE,
      height: SIZE,
      backgroundColor: colors.primary,
      borderRadius: SIZE,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
