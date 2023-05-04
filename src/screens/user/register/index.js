import * as Crypto from "expo-crypto";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button, Snackbar, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useMutation } from "react-query";
import { useUserState } from "src/contexts/userContext";
import { SafeLayout } from "src/layouts";
import api from "src/utils/api";
import screen from "src/utils/screen";

export default ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { colors } = useTheme();
  const [snackText, setSnackText] = useState(null);
  const styles = useStyle();
  const { updateUserData } = useUserState();

  const verifyPassword = async () => {
    return new Promise((resolve) => {
      if (confirmPassword != password) resolve(false);
      if (!!!password || password?.length < 8) resolve(false);
      resolve(true);
    });
  };

  const { isLoading, mutate } = useMutation(async () => {
    return new Promise(async (resolve) => {
      try {
        const passwordVerification = await verifyPassword();
        if (passwordVerification) {
          const passwordHash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.MD5,
            password
          );
          const registerResult = await api.requests.post(
            api.path.user.register,
            {
              name: username,
              username,
              password: passwordHash,
            }
          );
          if (registerResult?.error == 0) {
            setSnackText("Register successfully");
            setTimeout(async () => {
              const resp = await api.requests.post(api.path.user.auth, {
                username,
                password: passwordHash,
              });
              if (resp?.error == 0) {
                setSnackText("Authenticate successfully");
                updateUserData(resp?.data);
                navigation.pop();
              } else
                setSnackText("Something went wrong with your login credential");
            }, 400);
          }
        } else alert("Password must longer 8 characters");

        // if (resp?.error == 0) {
        //   setSnackText("Authenticate successfully");
        //   updateUserData(resp?.data);
        //   navigation.pop();
        // } else setSnackText("Something went wrong with your login credential");
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
      title="Register"
      popback
      style={{ flex: 1 }}
      edges={["top", "bottom"]}
    >
      <Snackbar
        visible={!!snackText}
        onDismiss={() => setSnackText(null)}
        duration={1000}
      >
        {snackText}
      </Snackbar>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, paddingHorizontal: 12 }}
      >
        <Text style={{ fontWeight: "bold", marginTop: 8 }}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Username"
            value={username}
            placeholder="email@gmail.com"
            onChangeText={(text) => setUsername(text)}
            style={styles.textInput}
            // error={username?.error}
            keyboardType="email-address"
            placeholderTextColor={colors.dark}
          />
        </View>
        <Text style={{ fontWeight: "bold", marginTop: 8 }}>Password</Text>
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
        <Text style={{ fontWeight: "bold", marginTop: 8 }}>
          Confirm Password
        </Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            label="Password"
            value={confirmPassword}
            placeholder="Password"
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError(!(text == password));
            }}
            style={styles.textInput}
            keyboardType="email-address"
            secureTextEntry={true}
            placeholderTextColor={colors.dark}
          />
        </View>
        {confirmPasswordError && (
          <Text style={{ fontWeight: "bold", marginTop: 8, color: "red" }}>
            Confirm Password must match password
          </Text>
        )}
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
          Register
        </Button>
      </KeyboardAvoidingView>
    </SafeLayout>
  );
};
const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    inputContainer: {
      height: 48,
      backgroundColor: colors.transparentBlack(0.1),
      borderRadius: 4,
    },
    passwordInputContainer: {
      height: 48,
      backgroundColor: colors.transparentBlack(0.1),
      borderRadius: 4,
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
