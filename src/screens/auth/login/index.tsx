import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { AntIcon, Block, Button, Input, Text } from "../../../helper";
import {
  $black,
  $gray,
  $gray2,
  $primary2,
  $white,
} from "../../../helper/theme";

const Login: React.FC<AuthTab> = ({ setAuth }) => {
  const setToken = async () => {
    try {
      await AsyncStorage.setItem("token", "login");
    } catch (error) {
      //
    }
  };
  return (
    <Block pt={20} style={{ flex: 2, backgroundColor: "#fafafa" }}>
      <Input
        textSize={16}
        placeholder="Email"
        placeholderTextColor={$gray}
        keyboardType="email-address"
        style={{
          height: 60,
          marginHorizontal: 25,
          paddingHorizontal: 15,
          backgroundColor: $white,
          borderRadius: 15,
          marginBottom: 20,
        }}
      />
      <Input
        textSize={16}
        placeholder="Password"
        placeholderTextColor={$gray}
        keyboardType="default"
        multiline={false}
        secureTextEntry={true}
        style={{
          height: 60,
          marginHorizontal: 25,
          paddingHorizontal: 15,
          backgroundColor: $white,
          borderRadius: 15,
        }}
      />
      <Button
        center
        middle
        mx={25}
        mt={20}
        style={{ height: 60, borderRadius: 15, backgroundColor: $primary2 }}
        onPress={() => setToken()}
      >
        <Text weight="bold" size={18} color={$black}>
          Login
        </Text>
      </Button>
      <Block center middle row mt={20}>
        <Text color={$gray} size={16}>
          Already have an account?{" "}
        </Text>
        <Button center middle onPress={() => setAuth("registration")}>
          <Text size={16} color="blue">
            Create an Account
          </Text>
        </Button>
      </Block>
      <Block mx={20} mt={20} style={{ height: 1, backgroundColor: $gray2 }} />
      <Button
        row
        center
        middle
        mx={25}
        mt={20}
        style={{ height: 60, borderRadius: 15, backgroundColor: $white }}
      >
        <AntIcon name="google" color={$black} size={20} />
        <Text weight="bold" ml={5} size={18} color={$black}>
          with Google
        </Text>
      </Button>
    </Block>
  );
};

export default Login;
