import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CommentScreen from "../components/home/post-item/comment-screen";
import PostDetailScreen from "../components/post/post-item-detail";
import PreviewScreen from "../components/profile/information/preview";
import AuthScreen, { LoginScreen, RegisterScreen } from "../screens/auth";
import HomeScreen from "../screens/home";
import CreatePostScreen from "../screens/post";
import PostDetail from "../screens/post/post-detail";
import ProfileScreen from "../screens/profile";
import EditProfileScreen from "../screens/profile/edit-profile";
import SearchScreen from "../screens/search";
import SettingScreen from "../screens/setting";
import ChooseLangScreen from "../screens/setting/choose-lang";

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
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
export function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreenStack" screenOptions={screenOptions}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <HomeStack.Screen name="CommentScreen" component={CommentScreen} />
      <HomeStack.Screen name="CreatePostScreen" component={CreatePostScreen} />
      <HomeStack.Screen name="PostDetailScreen" component={PostDetailScreen} />
      <HomeStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <HomeStack.Screen name="PostDetail" component={PostDetail} />
      <HomeStack.Screen name="PreviewScreen" component={PreviewScreen} />
    </HomeStack.Navigator>
  );
}

const SettingStack = createNativeStackNavigator();
export function SettingStackScreeen() {
  return (
    <SettingStack.Navigator initialRouteName="SettingScreenStack" screenOptions={screenOptions}>
      <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
      <SettingStack.Screen name="ChooseLangScreen" component={ChooseLangScreen} />
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
