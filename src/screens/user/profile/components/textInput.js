import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";

export default (props) => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <TextInput {...props} style={styles.textInput} />
    </View>
  );
};
const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: colors.transparentPrimary(0.6),
      marginBottom: 4,
    },
    textInput: {
      flex: 1,
      paddingHorizontal: 8,
      paddingVertical: 8,
      color: colors.black,
    },
  });
};
