import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Header from "../../components/header";
import { Block, Button, MaIcon, MDIcon, Text } from "../../helper";
import { Information } from "../../components/profile";
import TabView from "../../components/profile/tab-view";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector } from "../../hooks";
import { $gray2 } from "../../helper/theme";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const userInfo: any = useSelector(state => state.user.userInfo);

  const [openPopup, setOpenPopup] = useState<Boolean>(false);

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
              {userInfo?.friends?.length > 0 && (
                <Text>
                  {userInfo?.friends.length} {t("FOLLOWERS")}
                </Text>
              )}
            </Block>
          </Block>
        }
        right={
          <Block style={{ alignItems: "flex-end", width: "100%" }}>
            <Button px={10} onPress={() => setOpenPopup(!openPopup)}>
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
        <Information userInfo={userInfo} />
        <TabView />
      </ScrollView>
      {openPopup ? (
        <Block style={styles.popup}>
          <Button
            center
            middle
            style={{ height: 50 }}
            onPress={() => {
              setOpenPopup(!openPopup);
              navigation.navigate("EditProfileScreen", { userInfo });
            }}
          >
            <Text color="black">{t("CHANGE_PROFILE")}</Text>
          </Button>
          {/* <Button center middle style={{ height: 50 }}>
            <Text color="black">{t("CHANGE_PASSWORD")}</Text>
          </Button> */}
        </Block>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  popup: {
    width: 140,
    height: 50,
    marginTop: 40,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    shadowColor: "rgba(0, 0, 0, .4)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.41,
    elevation: 3,
  },
});
