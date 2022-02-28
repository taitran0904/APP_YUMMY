import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthScreen from "../screens/auth";
import HomeScreen from "../screens/home";

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: "white",
  },
};

const AuthStack = createNativeStackNavigator();
export function AuthScreenStack() {
  return (
    <AuthStack.Navigator
      initialRouteName="AuthStackScreen"
      screenOptions={screenOptions}
    >
      <AuthStack.Screen name="AuthScreen" component={AuthScreen} />
    </AuthStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
export function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreenStack"
      screenOptions={screenOptions}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}
