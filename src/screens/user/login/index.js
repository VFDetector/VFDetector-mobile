import React, { useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import assets from "src/assets";
import { SafeLayout } from "src/layouts";
import screen from "src/utils/screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useMutation from "react-query";

export default ({ navigation, route }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { colors } = useTheme();
  const styles = useStyle();
  // const {isLoading} = useMutation(async () => {
  //   await new Promise(
  //     async resolve => {
  //       setTimeout(() => {
  //         resolve();
  //       }, 3000);
  //     },
  //     {
  //       mutationKey: 'login-mutation',
  //     },
  //   );
  // });
  return (
    <SafeLayout style={{ flex: 1 }} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: screen.width / 3, height: screen.width / 3 }}
          source={assets.appIcon}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Food Detection</Text>
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
          onPress={() => navigation.replace("splash-login")}
          style={styles.loginButton}
          contentStyle={styles.loginButtonContent}
          loading={false}
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
