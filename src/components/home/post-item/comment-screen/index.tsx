import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { Block, Button, MaIcon, Text } from "../../../../helper";
import Header from "../../../header";
import CommentItem from "./comment-item";

export default function CommentScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <>
      <Header
        left={
          <Block row center middle>
            <Button px={10} onPress={() => navigation.goBack()}>
              <MaIcon name="arrow-back" color="black" size={20} />
            </Button>
            <Block>
              <Text color="black">{t("COMMENT")}</Text>
            </Block>
          </Block>
        }
        style={{ height: 50 }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
