import * as Crypto from "expo-crypto";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button, Snackbar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useMutation } from "react-query";
import { useUserState } from "src/contexts/userContext";
import { SafeLayout } from "src/layouts";
import api from "src/utils/api";
import screen from "src/utils/screen";

export default ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { colors } = useTheme();
  const [snackText, setSnackText] = useState(null);
  const styles = useStyle();
  const { updateUserData } = useUserState();

  const { isLoading, mutate } = useMutation(async () => {
    await new Promise(async (resolve) => {
      try {
        const passwordHash = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.MD5,
          password
        );
        const resp = await api.requests.post(api.path.user.auth, {
          username,
          password: passwordHash,
        });
        if (resp?.error == 0) {
          setSnackText("Authenticate successfully");
          updateUserData(resp?.data);
          navigation.pop();
        } else setSnackText("Something went wrong with your login credential");
        resolve();
      } catch (error) {
        console.log(error);
        setSnackText("Something went wrong with your login credential");
        resolve();
      }
    });
  });
  return (
    <SafeLayout
      title="Login"
      popback
      style={{ flex: 1 }}
      edges={["top", "bottom"]}
    >
      <Snackbar
        visible={!!snackText}
        onDismiss={() => setSnackText(null)}
        duration={2000}
      >
        {snackText}
      </Snackbar>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            label="Username"
            value={username}
            placeholder="username or email"
            onChangeText={(text) => setUsername(text)}
            style={styles.textInput}
            // error={username?.error}
            keyboardType="email-address"
            placeholderTextColor={colors.dark}
          />
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            label="Password"
            value={password}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            // error={username?.error}
            keyboardType="email-address"
            secureTextEntry={true}
            placeholderTextColor={colors.dark}
          />
        </View>
        <Button
          icon={() => (
            <Icon name="chevron-right" size={24} color={colors.white} />
          )}
          mode="contained"
          onPress={() => mutate()}
          style={styles.loginButton}
          contentStyle={styles.loginButtonContent}
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>
      </KeyboardAvoidingView>
    </SafeLayout>
  );
};
const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    inputContainer: {
      width: screen.width - 20,
      height: 48,
      backgroundColor: colors.transparentBlack(0.1),
      borderRadius: 4,
      marginTop: 40,
    },
    passwordInputContainer: {
      width: screen.width - 20,
      height: 48,
      backgroundColor: colors.transparentBlack(0.1),
      borderRadius: 4,
      marginTop: 8,
    },
    textInput: {
      flex: 1,
      paddingHorizontal: 20,
    },
    loginButton: {
      borderRadius: 4,
      marginTop: 10,
    },
    loginButtonContent: {
      width: screen.width - 20,
      height: 48,
      flexDirection: "row-reverse",
    },
  });
};
