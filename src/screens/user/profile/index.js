import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import { SafeLayout } from "src/layouts";
import { useStyle } from "./styles";
import Userbar from "./components/userbar";
import Option from "./components/option";
import TextInput from "./components/textInput";

export default () => {
  const styles = useStyle();
  const { colors } = useTheme();
  const [email, setEmail] = useState("abc@gmail.com");
  return (
    <SafeLayout popback style={styles.container}>
      <ScrollView>
        <Userbar />
        <TextInput
          label="email"
          value={email}
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
          onPress={() => console.log("Pressed")}
        >
          Log out
        </Button>
      </ScrollView>
    </SafeLayout>
  );
};
