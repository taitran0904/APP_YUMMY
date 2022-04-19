import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useSelector } from "../../../../hooks";

import { Block, Button, FEIcon, Input, MaIcon, Text } from "../../../../helper";
import Image from "../../../../helper/Image";
import { $gray3, $primary } from "../../../../helper/theme";
import Header from "../../../header";
import CommentItem from "./comment-item";
import { createCommentPost } from "../../../../redux/slice/PostSlice";

export default function CommentScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const commentList: any = useSelector((state: any) => state.post.postComment.data);
  const postId: any = useSelector((state: any) => state.post.postComment.postId);

  const [commentText, setCommentText] = React.useState("");
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
      {commentList?.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
          {commentList.map((item: any, index: number) => (
            <CommentItem key={index} body={item?.body} createdAt={item?.createdAt} user={item?.user} />
          ))}
        </ScrollView>
      ) : (
        <Block flex center middle>
          <Image
            pure
            source={require("../../../../assets/images/comment_null.png")}
            style={{ width: 300, height: 300 }}
          />
        </Block>
      )}

      <Block row bt={{ width: 1, color: $gray3 }} style={{ height: 100, width: "100%" }}>
        <Input
          value={commentText}
          multiline
          numberOfLines={4}
          editable
          maxLength={100}
          placeholder={t("WRITE_A_COMMENT")}
          onChangeText={(text: string) => setCommentText(text)}
          style={{
            borderRadius: 10,
            height: 100,
            width: "80%",
            paddingHorizontal: 10,
          }}
        />
        <Block center middle style={{ width: "20%" }}>
          <Button
            onPress={() => {
              dispatch(createCommentPost({ postId, body: commentText }));
              setCommentText("");
            }}
          >
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
