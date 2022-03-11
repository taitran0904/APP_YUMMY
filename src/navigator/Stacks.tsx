import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthScreen from "../screens/auth";
import HomeScreen from "../screens/home";
import SearchScreen from "../screens/search";
import SettingScreen from "../screens/setting";

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: "white",
  },
};

const AuthStack = createNativeStackNavigator();
export function AuthScreenStack() {
  return (
    <AuthStack.Navigator initialRouteName="AuthStackScreen" screenOptions={screenOptions}>
      <AuthStack.Screen name="AuthScreen" component={AuthScreen} />
    </AuthStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
export function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreenStack" screenOptions={screenOptions}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const SettingStack = createNativeStackNavigator();
export function SettingStackScreeen() {
  return (
    <SettingStack.Navigator initialRouteName="SettingScreenStack" screenOptions={screenOptions}>
      <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
    </SettingStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();
export function SearchStackScreen() {
  return (
    <SearchStack.Navigator initialRouteName="SearchScreenStack" screenOptions={screenOptions}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
    </SearchStack.Navigator>
  );
}
