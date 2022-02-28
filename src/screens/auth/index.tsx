import React, { useState } from "react";
import { Image } from "react-native";
import { Block } from "../../helper";
import { $primary2 } from "../../helper/theme";
import Login from "./login";
import Registration from "./registration";

export default function AuthScreen() {
  const [auth, setAuth] = useState<string>("login");
  return (
    <Block flex>
      <Block
        // flex
        center
        middle
        style={{
          backgroundColor: $primary2,
          height: auth !== "login" ? 150 : 200,
        }}
      >
        <Image
          style={{ width: 150, height: 68 }}
          source={require("../../assets/images/Yummy_app_white.png")}
        />
      </Block>
      {auth === "login" && <Login setAuth={setAuth} />}
      {auth !== "login" && <Registration setAuth={setAuth} />}
    </Block>
  );
}
