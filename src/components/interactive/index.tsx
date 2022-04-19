import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AntIcon, Block, Button } from "../../helper";
import { useAppDispatch, useSelector } from "../../hooks";
import { createReaction, fetchPostComment } from "../../redux/slice/PostSlice";

type Props = {
  post?: any;
};

const Interactive: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const userInfo: any = useSelector(state => state.user.userInfo);

  return (
    <>
      <Block row>
        <Button
          ml={20}
          my={10}
          onPress={() => {
            navigation.navigate("CommentScreen");
            dispatch(fetchPostComment(post?.id));
          }}
        >
          <AntIcon name="message1" size={24} color="black" />
        </Button>
        <Button
          ml={20}
          my={10}
          onPress={() => {
            dispatch(createReaction({ postId: post?.id, type: "love" }));
          }}
        >
          {post?.reaction?.length > 0 ? (
            post?.reaction.some((reactionVjp: any) => {
              return reactionVjp.user._id === userInfo._id;
            }) ? (
              <AntIcon name="heart" size={24} color="red" />
            ) : (
              <AntIcon name="hearto" size={24} color="black" />
            )
          ) : (
            <AntIcon name="hearto" size={24} color="black" />
          )}
        </Button>
      </Block>
    </>
  );
};

export default Interactive;
