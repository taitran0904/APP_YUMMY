import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../../components/header";
import { Block, Button, MaIcon, Text } from "../../../helper";

export default function ChooseLangScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();

  return (
    <Block>
      <Header
        left={
          <Block row center middle>
            <Button px={10} onPress={() => navigation.goBack()}>
              <MaIcon name="arrow-back" color="black" size={20} />
            </Button>
            <Text>{t("LANGUAGE")}</Text>
          </Block>
        }
        style={{ height: 60 }}
      />
    </Block>
  );
}
