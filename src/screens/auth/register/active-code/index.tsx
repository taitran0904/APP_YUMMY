import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet } from "react-native";
import Header from "../../../../components/header";
import NumberInput from "../../../../components/register/number-input";
import { Block, Button, FEIcon, MaIcon, Text } from "../../../../helper";
import { $primary } from "../../../../helper/theme";
import useOrientation from "../../../../hooks/useOrientation";
import { checkActiveCodeAPI, deleteUserAPI } from "../../../../redux/apis/user";
import dayjs from "dayjs";

export default function ActiveCodeScreen() {
  const { windowWidth } = useOrientation();
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState([" ", " ", " ", " ", " ", " "]);
  const [phoneNumber, setPhoneNumber] = useState(state);
  const [check, setCheck] = useState<Boolean>(false);
  const [validate, setValidate] = useState<Boolean>(false);

  useEffect(() => {
    if (state[5] === " " || check === false) setValidate(true);
    else setValidate(false);
  }, [state[5], check]);

  const backRegister = useCallback(async () => {
    const res: AxiosResponse = await deleteUserAPI({ userId: route?.params?.userId });
    if (res.status === 200) {
      navigation.navigate("Login");
    }
  }, []);

  const checkCode = useCallback(async () => {
    const res: AxiosResponse = await checkActiveCodeAPI({
      active_code: state.join(""),
      userId: route?.params?.userId,
    });
    if (res.data.success === true) {
      navigation.navigate("RegisterScreen", { userId: route?.params?.userId });
    } else if (dayjs(route.params?.timeNow).diff(dayjs(), "minute") >= 5) {
      backRegister();
    }
  }, [state]);

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
      <Block flex>
        <Block row center middle mt={100}>
          {state.map((item, index) => (
            <Button
              center
              middle
              ma={5}
              radius={10}
              key={index}
              shadow
              style={{ width: (windowWidth - 70) / 6, height: (windowWidth - 70) / 6 }}
            >
              <Text title size={24} color={$primary}>
                {item}
              </Text>
            </Button>
          ))}
        </Block>
        <Block row center middle>
          <Button
            center
            middle
            mx={10}
            my={10}
            radius={5}
            shadow
            onPress={() => setCheck(!check)}
            style={{ backgroundColor: check ? $primary : "white", width: 20, height: 20 }}
          >
            {check ? <FEIcon name="check" size={15} color="white" /> : <Block />}
          </Button>
          <Text style={{ width: 100 }} color="black">
            {t("AGREE")}
          </Text>
        </Block>
        <NumberInput
          checkCode={checkCode}
          validate={validate}
          setPhoneNumber={setPhoneNumber}
          state={state}
          setState={setState}
        />
      </Block>
    </>
  );
}

const styles = StyleSheet.create({});
