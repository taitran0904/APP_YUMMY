import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { Block, Button, FEIcon, Input, MaIcon, Text } from "../../../../helper";
import Image from "../../../../helper/Image";
import { $gray3, $primary } from "../../../../helper/theme";
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
      </ScrollView>
      <Block row bt={{ width: 1, color: $gray3 }} style={{ height: 100, width: "100%" }}>
        <Input
          multiline
          numberOfLines={4}
          editable
          maxLength={100}
          placeholder={t("WRITE_A_COMMENT")}
          style={{
            // borderWidth: 1,
            // borderColor: $gray3,
            borderRadius: 10,
            height: 100,
            width: "80%",
            paddingHorizontal: 10,
          }}
        />
        <Block center middle style={{ width: "20%" }}>
          <Button>
            <Image
              pure
              source={require("../../../../assets/images/send.png")}
              style={{ width: 50, height: 50 }}
            />
          </Button>
        </Block>
      </Block>
    </>
  );
}

const styles = StyleSheet.create({});
