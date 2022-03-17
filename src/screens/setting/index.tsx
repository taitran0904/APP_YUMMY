import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import Header from "../../components/header";
import { Block, Button, MDIcon, Modal, Text } from "../../helper";
import { $gray, $gray2, $gray3, $primary } from "../../helper/theme";

export default function SettingScreen() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState("en");

  const [modalVisible, setModalVisible] = useState(false);
  const setting = [
    {
      title: t("LANGUAGE"),
      icon: "alpha-l-box-outline",
      onPress: () => setModalVisible(true),
    },
    {
      title: t("PRIVACY"),
      icon: "security",
      onPress: () => console.log("hihi"),
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

  const lang = [
    {
      id: 1,
      title: "EN",
      value: "en",
    },
    {
      id: 2,
      title: "VN",
      value: "vn",
    },
  ];
  return (
    <Block flex>
      <Header
        left={
          <Text title size={24}>
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
        <Button center middle style={[styles.button, { backgroundColor: $primary }]}>
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
        {lang.map(item => (
          <Button
            key={item.id}
            flex
            center
            middle
            br={activeLang === item.value ? { width: 1, color: $gray3 } : { width: 1, color: $gray3 }}
            onPress={() => {
              setActiveLang(item.value);
              console.log(activeLang);
              AsyncStorage.setItem("language", activeLang);
              i18n.changeLanguage(activeLang);
            }}
          >
            <Text size={activeLang === item.value ? 32 : 14} title color={$primary}>
              {item.title}
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
