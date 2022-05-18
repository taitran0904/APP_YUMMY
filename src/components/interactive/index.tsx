import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

import { AntIcon, Block, Button } from "../../helper";
import { useAppDispatch, useSelector } from "../../hooks";
import { createReaction, fetchPostComment } from "../../redux/slice/PostSlice";
import useOrientation from "../../hooks/useOrientation";
import Image from "../../helper/Image";
import { $primary } from "../../helper/theme";

type Props = {
  post?: any;
};

const Interactive: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { windowWidth, windowHeight } = useOrientation();

  const userInfo: any = useSelector(state => state.user.userInfo);

  const [showReaction, setShowReaction] = useState<any>();

  const renderReaction = () => {
    const reactions = [
      {
        lottie: require("../../assets/lottie/yummy.json"),
        value: "yummy",
      },
      {
        lottie: require("../../assets/lottie/love.json"),
        value: "love",
      },
      {
        lottie: require("../../assets/lottie/like.json"),
        value: "like",
      },
      {
        lottie: require("../../assets/lottie/wow.json"),
        value: "wow",
      },
    ];

    return (
      <>
        {reactions.map((i, index) => (
          <Button
            key={index}
            mr={3}
            onPress={() => {
              dispatch(createReaction({ postId: post?.id, type: i.value }));
              // console.log("hihihihi");
              setShowReaction("");
            }}
          >
            <LottieView source={i.lottie} autoPlay loop style={{ width: 40, height: 40 }} />
          </Button>
        ))}
        <Button onPress={() => setShowReaction("")}>
          <AntIcon name="close" size={20} color={$primary} />
        </Button>
      </>
    );
  };

  const renderIsUserReacted = (i, userInfo) => {
    const isUserReacted = i.reaction.find((item: any) => item.user?._id === userInfo?._id);
    if (isUserReacted === undefined) {
      return <AntIcon name="hearto" size={24} color="black" />;
    } else if (isUserReacted.type === "yummy") {
      return (
        <Image pure source={require("../../assets/images/tasty.png")} style={{ width: 24, height: 24 }} />
      );
    } else if (isUserReacted.type === "love") {
      return (
        <Image pure source={require("../../assets/images/heart.png")} style={{ width: 24, height: 24 }} />
      );
    } else if (isUserReacted.type === "like") {
      return (
        <Image pure source={require("../../assets/images/like.png")} style={{ width: 24, height: 24 }} />
      );
    } else if (isUserReacted.type === "wow") {
      return <Image pure source={require("../../assets/images/wow.png")} style={{ width: 24, height: 24 }} />;
    }
  };

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
          onLongPress={() => {
            setShowReaction(post?.id);
          }}
          onPress={() => dispatch(createReaction({ postId: post?.id, type: "love" }))}
        >
          {/* {post?.reaction?.length > 0 ? (
            post?.reaction.some((reactionVjp: any) => {
              return reactionVjp.user._id === userInfo._id;
            }) ? (
              <AntIcon name="heart" size={24} color="red" />
            ) : (
              <AntIcon name="hearto" size={24} color="black" />
            )
          ) : (
            <AntIcon name="hearto" size={24} color="black" />
          )} */}
          {/* <AntIcon name="hearto" size={24} color="black" /> */}
          {renderIsUserReacted(post, userInfo)}
        </Button>
        {showReaction === post?.id && (
          <Block
            row
            center
            middle
            ml={60}
            style={{
              backgroundColor: "white",
              shadowColor: "rgba(0,0,0, .4)",
              shadowOffset: {
                width: 2,
                height: 15,
              },
              shadowOpacity: 0.3,
              shadowRadius: 3.41,
              elevation: 3,
              position: "absolute",
              bottom: 50,
              zIndex: 10000,
              alignSelf: "center",
              borderRadius: 15,
            }}
          >
            {renderReaction()}
          </Block>
        )}
      </Block>
    </>
  );
};

export default Interactive;
