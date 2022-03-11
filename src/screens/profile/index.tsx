import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/header";
import { Block, Button, MaIcon, Text } from "../../helper";

export default function ProfileScreen() {
  const { t } = useTranslation();
  return (
    <Block>
      <Header
        left={
          <Block row center middle>
            <Button style={{ marginRight: 10 }}>
              <MaIcon name="arrow-back" color="black" size={20} />
            </Button>
            <Block>
              <Text color="black">John</Text>
              <Text>6 {t("FOLLOWERS")}</Text>
            </Block>
          </Block>
        }
        centerStyle={{
          flex: 0,
        }}
        style={{ height: 50, backgroundColor: "red" }}
      />
    </Block>
  );
}
