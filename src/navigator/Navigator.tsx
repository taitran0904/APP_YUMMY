import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AuthScreenStack, HomeStackScreen, SearchStackScreen, SettingStackScreeen } from "./Stacks";

type Props = {
  auth?: boolean;
};

const BottomTab = createBottomTabNavigator();

export default function Navigator({ auth }: Props) {
  if (auth)
    return (
      <NavigationContainer>
        <AuthScreenStack />
      </NavigationContainer>
    );
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          options={{ headerShown: false }}
          name="HomeStackScreen"
          component={HomeStackScreen}
        />
        <BottomTab.Screen
          options={{ headerShown: false }}
          name="SearchStackScreen"
          component={SearchStackScreen}
        />
        <BottomTab.Screen
          options={{ headerShown: false }}
          name="SettingStackScreen"
          component={SettingStackScreeen}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
