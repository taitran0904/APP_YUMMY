import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { AntIcon, Block, Button, Input, Text } from "../../../helper";
import { $black, $gray, $gray2, $primary2, $white } from "../../../helper/theme";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <Block pt={20} flex center middle style={{ backgroundColor: "#fafafa" }}>
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
        placeholder="Name"
        placeholderTextColor={$gray}
        keyboardType="default"
        multiline={false}
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
        placeholder="Phone"
        placeholderTextColor={$gray}
        keyboardType="numeric"
        multiline={false}
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
        mt={20}
        px={20}
        style={{ height: 60, borderRadius: 15, backgroundColor: $primary2 }}
      >
        <Text weight="bold" size={18} color={$black}>
          Create an Account
        </Text>
      </Button>
      <Block center middle row mt={20}>
        <Text color={$gray} size={16}>
          Already have an account?{" "}
        </Text>
        <Button center middle onPress={() => navigation.goBack()}>
          <Text size={16} color="blue">
            {t("LOGIN")}
          </Text>
        </Button>
      </Block>
    </Block>
  );
}
