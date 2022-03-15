import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ScrollableTabView from "react-native-scrollable-tab-view";

import Header from "../../components/header";
import { Block, Button, MaIcon, Text } from "../../helper";
import { ImageTab, Information } from "../../components/profile";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();

  const _renderProfileTabs = () => {
    return (
      <ScrollableTabView>
        <ImageTab />
      </ScrollableTabView>
    );
  };
  return (
    <Block>
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
        centerStyle={{
          flex: 0,
        }}
        style={{ height: 50 }}
      />
      <Information />
    </Block>
  );
}
