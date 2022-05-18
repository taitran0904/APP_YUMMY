import { useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image } from "react-native";
import Header from "../../../../components/header";
import { AntIcon, Block, Button, Input, Loading, MaIcon, Text } from "../../../../helper";
import { $black, $gray, $gray2, $primary, $primary2, $white } from "../../../../helper/theme";
import { register } from "../../../../redux/apis/user";

export default function SendEmailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendCode = useCallback(async () => {
    setLoading(true);
    const res: AxiosResponse = await register({ email: email });
    if (res.data.success === true) {
      setLoading(false);
      navigation.navigate("ActiveCodeScreen", { userId: res.data.data, email: email, timeNow: dayjs() });
    } else if (res.data.success === false) {
      Alert.alert("Warning", t("EMAIL_EXIST"));
      setEmail("");
      setLoading(false);
    }
  }, [email]);

  console.log("dsds", loading);

  return (
    <>
      <Header
        left={
          <Button px={10} onPress={() => navigation.goBack()}>
            <MaIcon name="arrow-back" color="black" size={20} />
          </Button>
        }
        style={{ height: 50 }}
      />
      <Block pt={20} flex center middle style={{ backgroundColor: "#fafafa" }}>
        <Input
          value={email}
          textSize={16}
          placeholder="Email"
          placeholderTextColor={$gray}
          keyboardType="email-address"
          onChangeText={e => setEmail(e)}
          style={{
            height: 60,
            marginHorizontal: 25,
            paddingHorizontal: 15,
            backgroundColor: $white,
            borderRadius: 15,
            marginBottom: 20,
          }}
        />
        <Button
          row
          center
          middle
          mt={20}
          px={20}
          onPress={() => {
            sendCode();
            // navigation.navigate("ActiveCodeScreen")
          }}
          style={{ height: 50, borderRadius: 10, backgroundColor: $primary }}
        >
          {loading === true && <Loading color={$white} style={{ marginRight: 5 }} />}
          <Text weight="bold" size={18} color={$white}>
            {t("NEXT")}
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
    </>
  );
}
