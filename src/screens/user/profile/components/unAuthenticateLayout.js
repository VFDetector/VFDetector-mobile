import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import screen from "src/utils/screen";

export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: screen.width - 20,
        height: screen.width - 20,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
      }}
    >
      <Text style={{ textAlign: "center" }}>
        Your have not authenticate yet, Login for load User profile{" "}
        {`(This is optional)`}
      </Text>
      <Text style={{ marginVertical: 10, color: "gray" }}>
        Do not have account?
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("user-register")}
      >
        Register
      </Button>
      <Text style={{ marginVertical: 10, color: "gray" }}>
        Adready have account
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("user-login")}
      >
        Login
      </Button>
    </View>
  );
};
