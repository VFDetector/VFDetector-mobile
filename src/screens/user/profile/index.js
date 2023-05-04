import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Button, Divider, Switch, useTheme } from "react-native-paper";
import { SafeLayout } from "src/layouts";
import { useStyle } from "./styles";
import Userbar from "./components/userbar";
import Option from "./components/option";
import TextInput from "./components/textInput";
import { useUserState } from "src/contexts/userContext";
import UnAuthenticateLayout from "./components/unAuthenticateLayout";

export default () => {
  const styles = useStyle();
  const { colors } = useTheme();
  const [email, setEmail] = useState("abc@gmail.com");
  const { mode, switchMode, userData, clearUserData } = useUserState();
  return (
    <SafeLayout popback style={styles.container}>
      {!!userData ? (
        <ScrollView style={styles.scrollView}>
          <Userbar />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 4,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              Mode {mode ? "Online" : "Offline"}
            </Text>
            <Switch value={mode} onValueChange={switchMode} />
          </View>
          <TextInput
            label="email"
            value={userData?.username}
            placeholder="email"
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            placeholderTextColor={colors.dark}
            editable={false}
          />
          <Button
            color={colors.transparentPrimary(0.8)}
            style={{ marginBottom: 4 }}
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Favourite
          </Button>
          <Button
            color={colors.transparentPrimary(0.6)}
            style={{ marginBottom: 20 }}
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Change password
          </Button>
          <Button
            labelStyle={{ color: colors.error }}
            mode="contained"
            color={colors.transparentError(0.06)}
            onPress={() =>
              Alert.alert("Logout", "You want to sign out?", [
                {
                  text: "Logout",
                  style: "destructive",
                  onPress: () => clearUserData(),
                },
                {
                  text: "Cancle",
                  style: "cancel",
                },
              ])
            }
          >
            Log out
          </Button>
        </ScrollView>
      ) : (
        <UnAuthenticateLayout />
      )}
    </SafeLayout>
  );
};
