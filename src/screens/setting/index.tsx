import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import Header from "../../components/header";
import { Block, Button, MDIcon, Modal, Text } from "../../helper";
import { $gray3, $primary } from "../../helper/theme";

export default function SettingScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

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
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        transparent={true}
      >
        <Button
          style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22, zIndex: 10 }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Block
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              zIndex: 1000,
            }}
          >
            <Button onPress={() => setModalVisible(!modalVisible)}>
              <Text>hihi</Text>
            </Button>
          </Block>
        </Button>
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
