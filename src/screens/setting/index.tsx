import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import Header from "../../components/header";
import { Block, Button, MDIcon, Text } from "../../helper";
import { $gray3, $primary } from "../../helper/theme";

export default function SettingScreen() {
  const { t } = useTranslation();
  const setting = [
    {
      title: t("LANGUAGE"),
      icon: "alpha-l-box-outline",
    },
    {
      title: t("PRIVACY"),
      icon: "security",
    },
    {
      title: t("HELP_SUPPORT"),
      icon: "help-circle-outline",
    },
    {
      title: t("INTRODUCE"),
      icon: "information-outline",
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
          borderBottomWidth: 1,
          borderBottomColor: $gray3,
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
