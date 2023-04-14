import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { SafeLayout } from "src/components/layout";
import { useStyle } from "./styles";
import Userbar from "./components/userbar";
import Option from "./components/option";

export default ({ navigation, route }) => {
  const styles = useStyle();
  return (
    <SafeLayout style={styles.container}>
      <ScrollView>
        <Text style={styles.accountTitle}>Account</Text>
        <Divider />
        <Userbar />
        <Divider />
        <Text style={styles.settingTitle}>Setting</Text>
        <Divider />
        <Button
          icon="logout"
          style={{
            borderRadius: 0,
          }}
          contentStyle={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
          onPress={() => console.log("Pressed")}
        >
          Log out
        </Button>
      </ScrollView>
    </SafeLayout>
  );
};
