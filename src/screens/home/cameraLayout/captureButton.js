import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default CaptureButton = ({ style, icon, activeLayout, onPress }) => {
  const styles = useStyle();
  return !activeLayout ? (
    <Shadow
      startColor={`rgba(180, 180, 180, 0.2)`}
      containerStyle={[style, styles.container(activeLayout)]}
    >
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Icon name={icon} size={32} color="white" />
      </TouchableOpacity>
    </Shadow>
  ) : null;
};
const useStyle = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const SIZE = 80;
  return StyleSheet.create({
    container: (active) => ({}),
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
