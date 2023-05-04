import React from "react";
import { Shadow } from "react-native-shadow-2";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default ProfileButton = ({ activeLayout }) => {
  const styles = useStyle();
  const navigation = useNavigation();
  return (
    <Shadow
      startColor={`rgba(180, 180, 180, 0.2)`}
      containerStyle={styles.container(activeLayout)}
    >
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("user-profile")}
      >
        <Icon name="account" size={28} color="white" />
      </TouchableOpacity>
    </Shadow>
  );
};
const useStyle = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const SIZE = 44;
  return StyleSheet.create({
    container: (active) => ({
      position: "absolute",
      zIndex: 2,
      top: active ? 0 : -100,
      right: 10,
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
