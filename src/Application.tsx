import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigator from "./navigator/Navigator";
import AuthScreen from "./screens/auth";
import { SafeAreaView } from "react-native";
import { Block } from "./helper";
import { useTranslation } from "react-i18next";

export default function Application() {
  const { i18n } = useTranslation();
  const [token, setToken] = useState<string>("");

  const getToken = async () => {
    try {
      const tokenFromStorage = await AsyncStorage.getItem("token");
      console.log("tokenn", tokenFromStorage);
      if (tokenFromStorage) setToken(tokenFromStorage);
    } catch (error) {
      //
    }
  };

  const getLanguage = async () => {
    try {
      const lang = await AsyncStorage.getItem("language");
      console.log("lang", lang);
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Block flex>
        {/* {token === "login" ? <Navigator /> : <AuthScreen />} */}
        <Navigator />
      </Block>
    </SafeAreaView>
  );
}
