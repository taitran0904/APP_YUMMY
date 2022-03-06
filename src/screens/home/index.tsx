import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import Header from "../../components/header";
import { Stories } from "../../components/home/stories";
import { AntIcon, Block, Button, IoIcon, Text } from "../../helper";
import { $gray3, $primary2 } from "../../helper/theme";
import useOrientation from "../../hooks/useOrientation";
function HomeScreen() {
  const { windowWidth } = useOrientation();
  const { t } = useTranslation();
  return (
    <Block>
      <Header
        left={<AntIcon name="user" size={24} color="black" />}
        // center={<AntIcon name="user" size={24} color="black" />}
        // right={<AntIcon name="user" size={24} color="black" />}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: $gray3,
          height: 100,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block row style={{ borderBottomWidth: 1, borderBottomColor: $gray3 }}>
          <Button
            row
            center
            middle
            py={10}
            style={{ width: windowWidth / 2, borderRightWidth: 1, borderRightColor: $gray3 }}
          >
            <IoIcon name="image" size={20} color={$primary2} />
            <Text>{t("IMAGE")}</Text>
          </Button>
          <Button row center middle py={10} style={{ width: windowWidth / 2 }}>
            <IoIcon name="document-text" size={20} color={$primary2} />
            <Text>{t("STATUS")}</Text>
          </Button>
        </Block>
        <Stories />
      </ScrollView>
    </Block>
  );
}

export default HomeScreen;
