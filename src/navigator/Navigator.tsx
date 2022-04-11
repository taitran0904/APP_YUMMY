import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  AuthScreenStack,
  HomeStackScreen,
  NotificationStackScreen,
  SearchStackScreen,
  SettingStackScreeen,
} from "./Stacks";
import { FEIcon } from "../helper";
import { $primary } from "../helper/theme";

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
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: $primary,
        }}
      >
        <BottomTab.Screen
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => <FEIcon name="home" size={size} color={color} />,
          }}
          name="HomeStackScreen"
          component={HomeStackScreen}
        />
        <BottomTab.Screen
          options={{
            headerShown: false,
            tabBarLabel: "Search",

            tabBarIcon: ({ color, size }) => <FEIcon name="search" size={size} color={color} />,
          }}
          name="SearchStackScreen"
          component={SearchStackScreen}
        />
        <BottomTab.Screen
          options={{
            headerShown: false,
            tabBarLabel: "Notification",
            tabBarIcon: ({ color, size }) => <FEIcon name="bell" size={size} color={color} />,
          }}
          name="NotificationStackScreen"
          component={NotificationStackScreen}
        />
        <BottomTab.Screen
          options={{
            headerShown: false,
            tabBarLabel: "Setting",
            tabBarIcon: ({ color, size }) => <FEIcon name="settings" size={size} color={color} />,
          }}
          name="SettingStackScreen"
          component={SettingStackScreeen}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
