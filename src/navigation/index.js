import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import DishDetail from "src/screens/dishes/detail";
import DishList from "src/screens/dishes/list";
import Login from "src/screens/user/login";
import Profile from "src/screens/user/profile";
import Register from "src/screens/user/register";
import AppInitiation from "src/screens/user/splash/initiation";
import LoginSplash from "src/screens/user/splash/login";
import Home from "../screens/home";

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
          name="user-login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="user-register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="splash-login"
          component={LoginSplash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="user-profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dish-list"
          component={DishList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dish-detail"
          component={DishDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
