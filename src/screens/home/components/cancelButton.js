import React from "react";
import { Shadow } from "react-native-shadow-2";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default CancelButton = ({ activeLayout, onPress }) => {
  const styles = useStyle();
  return !activeLayout ? (
    <Shadow
      startColor={`rgba(180, 180, 180, 0.2)`}
      containerStyle={styles.container(activeLayout)}
    >
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Icon name="window-close" size={28} color="white" />
      </TouchableOpacity>
    </Shadow>
  ) : null;
};
const useStyle = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const SIZE = 44;
  return StyleSheet.create({
    container: (active) => ({
      position: "absolute",
      zIndex: 2,
      top: insets.top,
      left: 10,
    }),
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
