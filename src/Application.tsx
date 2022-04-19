import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigator from "./navigator/Navigator";
import { useTranslation } from "react-i18next";

import { Block } from "./helper";
import { useAppDispatch, useSelector } from "./hooks";
import LoginScreen from "./screens/auth/login";
import { saveToken } from "./redux/slice/UserSlice";
import { fetchPost } from "./redux/slice/PostSlice";

export default function Application() {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const token = useSelector(state => state.user.token);

  const getToken = async () => {
    try {
      const tokenFromStorage = await AsyncStorage.getItem("token");
      if (tokenFromStorage) dispatch(saveToken(tokenFromStorage));
    } catch (error) {
      //
    }
  };

  const getLanguage = async () => {
    try {
      const lang = await AsyncStorage.getItem("language");
      if (lang) i18n.changeLanguage(lang);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken]);

  useEffect(() => {
    if (token) {
      dispatch(fetchPost());
    }
  }, [token]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Block flex>{token ? <Navigator /> : <Navigator auth />}</Block>
    </SafeAreaView>
  );
}
