import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import Header from "../../components/header";
import { Block, Button, MDIcon, Modal, Text } from "../../helper";
import { $gray, $gray2, $gray3, $primary } from "../../helper/theme";
import { useAppDispatch } from "../../hooks";
import { logout, logoutSuccess } from "../../redux/slice/UserSlice";

export default function SettingScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState("en");

  const [modalVisible, setModalVisible] = useState(false);
  const setting = [
    {
      title: t("MY_QR_CODE"),
      icon: "qrcode",
      onPress: () => navigation.navigate("QRCodeScreen"),
    },
    {
      title: t("LANGUAGE"),
      icon: "alpha-l-box-outline",
      onPress: () => setModalVisible(true),
    },
    {
      title: t("HELP_SUPPORT"),
      icon: "help-circle-outline",
      onPress: () => console.log("hihi"),
    },
    {
      title: t("INTRODUCE"),
      icon: "information-outline",
      onPress: () => console.log("hihi"),
    },
  ];

  const languages = [
    {
      key: "en",
      lang: "EN",
    },
    {
      key: "vn",
      lang: "VN",
    },
  ];

  useEffect(() => {
    i18n.changeLanguage(activeLang);
    AsyncStorage.setItem("language", activeLang);
  }, [activeLang]);

  return (
    <Block flex>
      <Header
        left={
          <Text title size={24} px={15}>
            {t("SETTING")}
          </Text>
        }
        style={{
          height: 100,
        }}
      />
      <Block>
        {setting.map((item: any, index: number) => (
          <Button
            row
            middle
            key={index}
            pl={10}
            onPress={item.onPress}
            style={[
              styles.button,
              {
                borderWidth: 1,
                borderColor: $primary,
                marginTop: index === 0 ? 10 : 0,
              },
            ]}
          >
            <MDIcon name={item.icon} size={24} color={$primary} style={{ marginHorizontal: 5 }} />
            <Text size={16}>{item.title}</Text>
          </Button>
        ))}
      </Block>
      <Block style={{ position: "absolute", width: "100%", bottom: 0 }}>
        <Button
          center
          middle
          style={[styles.button, { backgroundColor: $primary }]}
          onPress={() => dispatch(logout())}
        >
          <Text title color="white">
            {t("LOGOUT")}
          </Text>
        </Button>
      </Block>
      <Modal
        width={200}
        height={100}
        radius={20}
        visible={modalVisible}
        setVisible={setModalVisible}
        style={{ flexDirection: "row" }}
      >
        {languages.map(item => (
          <Button
            key={item.key}
            flex
            center
            middle
            br={activeLang === item.key ? { width: 1, color: $gray3 } : { width: 1, color: $gray3 }}
            onPress={() => setActiveLang(item.key)}
          >
            <Text size={activeLang === item.key ? 32 : 14} title color={$primary}>
              {item.lang}
            </Text>
          </Button>
        ))}
      </Modal>
    </Block>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 15,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
  },
});
