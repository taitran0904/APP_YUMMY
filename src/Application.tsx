import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigator from "./navigator/Navigator";
import AuthScreen from "./screens/auth";
import { SafeAreaView } from "react-native";
import { Block } from "./helper";

export default function Application() {
  const [token, setToken] = useState<string>("");
  const getToken = async () => {
    const tokenFromStorage = await AsyncStorage.getItem("token");
    console.log("tokenn", tokenFromStorage);
    if (tokenFromStorage) setToken(tokenFromStorage);
  };

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
