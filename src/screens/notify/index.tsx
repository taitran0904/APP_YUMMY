import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Block, FEIcon, Input, Text, Button } from "../../helper";
import Header from "../../components/header";
import { $gray3, $primary } from "../../helper/theme";
import { useTranslation } from "react-i18next";
import UserItem from "../../components/search/user-item";
import useOrientation from "../../hooks/useOrientation";
import BottomSheet from "../../helper/BottomSheet";

export default function NotifyScreen() {
  const { t } = useTranslation();
  const { windowHeight, windowWidth } = useOrientation();
  return (
    <>
      <Block>
        <Header leftStyle={{ flex: 0 }} rightStyle={{ flex: 0 }} style={styles.header} />
        {/* <ScrollView showsVerticalScrollIndicator={false}>
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
        </ScrollView> */}
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: $gray3,
    height: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: $gray3,
    borderRadius: 10,
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
});
