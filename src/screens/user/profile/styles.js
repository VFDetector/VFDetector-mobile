import { StyleSheet } from "react-native";
import screen from "src/utils/screen";
import { useTheme } from "react-native-paper";

export const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
    accountTitle: {
      fontWeight: "bold",
      marginLeft: 14,
      fontSize: 20,
      marginBottom: 10,
    },
    settingTitle: {
      fontWeight: "bold",
      marginLeft: 14,
      fontSize: 20,
      marginTop: 20,
      marginBottom: 8,
    },
    scrollView: {
      paddingHorizontal: 10,
    },
  });
};
