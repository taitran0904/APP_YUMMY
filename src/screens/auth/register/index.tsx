import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { MaIcon, Block, Button, Input, Text, Loading } from "../../../helper";
import Header from "../../../components/header";
import { $black, $gray, $gray2, $primary, $primary2, $white } from "../../../helper/theme";
import { addInfoAPI } from "../../../redux/apis/user";
import { AxiosResponse } from "axios";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  const [validate, setValidate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<any>({
    name: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const register = useCallback(async () => {
    setLoading(true);
    const res: AxiosResponse = await addInfoAPI({
      userId: route.params?.userId,
      name: info.name,
      phone: info.phone,
      password: info.password,
    });
    if (res.data.success === true) {
      navigation.navigate("LoginScreen");
      setLoading(false);
    }
  }, [info, route.params?.userId]);

  useEffect(() => {
    if (info.name === "" || info.password !== info.cpassword) setValidate(true);
    else setValidate(false);
  }, [info]);

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
          value={info.name}
          textSize={16}
          placeholder="Name"
          placeholderTextColor={$gray}
          keyboardType="default"
          multiline={false}
          onChangeText={e => setInfo({ ...info, name: e })}
          style={styles.input}
        />
        <Input
          value={info.phone}
          textSize={16}
          placeholder="Phone"
          placeholderTextColor={$gray}
          keyboardType="numeric"
          multiline={false}
          onChangeText={e => setInfo({ ...info, phone: e })}
          style={styles.input}
        />
        <Input
          value={info.password}
          textSize={16}
          placeholder="Password"
          placeholderTextColor={$gray}
          keyboardType="default"
          multiline={false}
          secureTextEntry={true}
          onChangeText={e => setInfo({ ...info, password: e })}
          style={styles.input}
        />

        <Input
          value={info.cpassword}
          textSize={16}
          placeholder="Confirm Password"
          placeholderTextColor={$gray}
          keyboardType="default"
          multiline={false}
          secureTextEntry={true}
          onChangeText={e => setInfo({ ...info, cpassword: e })}
          style={[styles.input]}
        />
        <Button
          row
          center
          middle
          disabled={validate}
          mt={20}
          px={20}
          onPress={register}
          style={{ height: 50, borderRadius: 15, backgroundColor: $primary }}
        >
          {loading && <Loading color={$white} style={{ marginRight: 5 }} />}
          <Text weight="bold" size={18} color={$white}>
            {t("CREATE_ACC")}
          </Text>
        </Button>
        {/* <Block center middle row mt={20}>
        <Text color={$gray} size={16}>
          Already have an account?{" "}
        </Text>
        <Button center middle onPress={() => navigation.goBack()}>
          <Text size={16} color="blue">
            {t("LOGIN")}
          </Text>
        </Button>
      </Block> */}
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    marginHorizontal: 25,
    paddingHorizontal: 15,
    backgroundColor: $white,
    borderRadius: 15,
    marginBottom: 20,
  },
});
