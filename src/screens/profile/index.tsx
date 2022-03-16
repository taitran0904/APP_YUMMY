import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Header from "../../components/header";
import { Block, Button, MaIcon, MDIcon, Text } from "../../helper";
import { Information } from "../../components/profile";
import TabView from "../../components/profile/tab-view";
import { ScrollView } from "react-native";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();

  return (
    <>
      <Header
        left={
          <Block row center middle>
            <Button px={10} onPress={() => navigation.goBack()}>
              <MaIcon name="arrow-back" color="black" size={20} />
            </Button>
            <Block>
              <Text color="black">John</Text>
              <Text>6 {t("FOLLOWERS")}</Text>
            </Block>
          </Block>
        }
        right={
          <Block style={{ alignItems: "flex-end", width: "100%" }}>
            <Button px={10}>
              <MDIcon name="dots-vertical" size={24} color="black" />
            </Button>
          </Block>
        }
        centerStyle={{
          flex: 0,
        }}
        style={{ height: 50 }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Information />
        <TabView />
      </ScrollView>
    </>
  );
}
