import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Block, FEIcon, Input } from "../../helper";
import Header from "../../components/header";
import { $gray3, $primary } from "../../helper/theme";
import { useTranslation } from "react-i18next";
import UserItem from "../../components/search/user-item";

export default function SearchScreen() {
  const { t } = useTranslation();
  return (
    <Block>
      <Header
        leftStyle={{ flex: 0 }}
        rightStyle={{ flex: 0 }}
        center={
          <Input
            placeholder={t("SEARCH")}
            suffix={<FEIcon name="search" color={$primary} size={20} />}
            style={styles.input}
          />
        }
        style={styles.header}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </Block>
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
