import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import MainTabs from "./tabs";
import AppInitiation from "src/screens/user/splash/initiation";
import Login from "src/screens/user/login";
import LoginSplash from "src/screens/user/splash/login";
// import FoodScan from 'src/screens/scan';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash-init">
        <Stack.Screen
          name="splash-init"
          component={AppInitiation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="splash-login"
          component={LoginSplash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="user-login"
          component={Login}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="detection-scan"
          component={FoodScan}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
