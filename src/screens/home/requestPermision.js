import React from "react";
import { View, StyleSheet, Linking, Platform } from "react-native";
import * as Application from "expo-application";
import { Button, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeLayout } from "src/layouts";
import screen from "src/utils/screen";

export default RequestPermission = () => {
  const { colors } = useTheme();
  const styles = useStyle();
  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL(`app-settings:root=${Application.applicationId}`);
    } else {
      Linking.openSettings();
    }
  };
  return (
    <SafeLayout contentStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="cog" size={40} color={colors.primary} />
        <Icon name="camera" size={40} color={colors.primary} />
      </View>
      <Text style={styles.label}>
        Allow
        <Text style={styles.appName}>{` ${Application.applicationName} `}</Text>
        access to camera, after permission granted please restart app
      </Text>
      <Button
        style={{ marginTop: 20 }}
        mode="contained"
        onPress={() => openSettings()}
      >
        Open Setting
      </Button>
    </SafeLayout>
  );
};

export const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    iconContainer: {
      flexDirection: "row",
    },
    label: {
      textAlign: "center",
      marginHorizontal: 20,
      marginTop: 10,
    },
    appName: {
      fontWeight: "bold",
      color: colors.primary,
    },
  });
};
