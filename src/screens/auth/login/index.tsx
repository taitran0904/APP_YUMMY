import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, StyleSheet } from "react-native";
import { AntIcon, Block, Button, Input, Loading, Text } from "../../../helper";
import { $black, $gray, $gray2, $primary, $primary2, $white } from "../../../helper/theme";
import { useAppDispatch, useSelector } from "../../../hooks";
import { login } from "../../../redux/slice/UserSlice";
import { LoginProps } from "../../../types/user";

export default function LoginScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const loading = useSelector(state => state.user.actionLoading);

  const [account, setAccount] = useState<LoginProps>({ email: "", password: "" });

  const onSubmit = (): void => {
    if (account.email === "") Alert.alert("Warning", "Email is required");
    else if (account.password === "") Alert.alert("Warning", "Password is required");
    else dispatch(login({ ...account }));
  };

  return (
    <Block flex>
      <Block
        // flex
        center
        middle
        style={{
          backgroundColor: $primary2,
          height: 150,
        }}
      >
        <Image
          style={{ width: 150, height: 68 }}
          source={require("../../../assets/images/Yummy_app_white.png")}
        />
      </Block>
      <Block pt={20} style={{ flex: 2, backgroundColor: "#fafafa" }}>
        <Input
          value={account?.email}
          textSize={16}
          placeholder="Email"
          placeholderTextColor={$gray}
          keyboardType="email-address"
          onChangeText={(email: string) => setAccount({ ...account, email })}
          style={[
            styles.input,
            {
              marginBottom: 20,
            },
          ]}
        />
        <Input
          value={account?.password}
          textSize={16}
          placeholder="Password"
          placeholderTextColor={$gray}
          keyboardType="default"
          multiline={false}
          secureTextEntry={true}
          onChangeText={(password: string) => setAccount({ ...account, password })}
          style={styles.input}
        />
        <Button
          row
          center
          middle
          mx={25}
          mt={20}
          onPress={onSubmit}
          style={{ height: 60, borderRadius: 15, backgroundColor: $primary2 }}
        >
          {loading && <Loading color={$primary} style={{ marginRight: 5 }} />}
          <Text weight="bold" size={18} color={$black}>
            {t("LOGIN")}
          </Text>
        </Button>
        <Block center middle row mt={20}>
          <Text color={$gray} size={16}>
            Already have an account?{" "}
          </Text>
          <Button center middle onPress={() => navigation.navigate("RegisterScreen")}>
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
    </Block>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    marginHorizontal: 25,
    paddingHorizontal: 15,
    backgroundColor: $white,
    borderRadius: 15,
  },
});
