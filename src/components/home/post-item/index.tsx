import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

import { AntIcon, Block, FEIcon, IoIcon, Text } from "../../../helper";
import { $gray, $gray3, $primary, $primary2 } from "../../../helper/theme";
import Interactive from "../../interactive";
import { useTranslation } from "react-i18next";
import { IMAGE_BASE_URL } from "../../../constant";
import Image from "../../../helper/Image";
import dayjs from "dayjs";

type Props = {
  post?: any;
};
export const PostItem: React.FC<Props> = ({ post }) => {
  const { t } = useTranslation();
  const [photoList, setPhotoList] = useState<any>([]);

  useEffect(() => {
    const photos: any = [];
    post.photos.forEach((photo: any) => {
      photos.push(`${IMAGE_BASE_URL}/user/posts/${photo}`);
    });
    setPhotoList(photos);
  }, [post]);

  const publicArray = [
    {
      id: 0,
      lable: t("PUBLIC"),
      icon: <IoIcon name="earth" size={20} color={$gray} />,
    },
    {
      id: 1,
      lable: t("FRIEND_ONLY"),
      icon: <FEIcon name="users" size={20} color={$gray} />,
    },
    {
      id: 2,
      lable: t("ONLY_ME"),
      icon: <FEIcon name="lock" size={20} color={$gray} />,
    },
  ];

  const statusArray = [
    {
      lable: t("NONE"),
      icon: <AntIcon name="close" size={20} style={{ marginLeft: 5 }} />,
    },
    {
      lable: t("HAPPY"),
      icon: (
        <Image
          style={{ height: 20, width: 20, marginLeft: 5 }}
          pure
          source={require("../../../assets/icons/happy.png")}
        />
      ),
    },
    {
      lable: t("SAD"),
      icon: (
        <Image
          style={{ height: 20, width: 20, marginLeft: 5 }}
          pure
          source={require("../../../assets/icons/sad.png")}
        />
      ),
    },
    {
      lable: t("ANGRY"),
      icon: (
        <Image
          style={{ height: 20, width: 20, marginLeft: 5 }}
          pure
          source={require("../../../assets/icons/angry.png")}
        />
      ),
    },
    {
      lable: t("SURPRISED"),
      icon: (
        <Image
          style={{ height: 20, width: 20, marginLeft: 5 }}
          pure
          source={require("../../../assets/icons/surprised.png")}
        />
      ),
    },
  ];

  const _renderInfor = () => {
    return (
      <Block row>
        <Block row middle style={{ margin: 10 }}>
          <Image
            checkEmpty={post?.user?.avatar}
            source={{ uri: `${IMAGE_BASE_URL}/user/avatar/${post?.user?.avatar}` }}
            style={styles.avatar}
          />
          <Block ml={10}>
            <Text size={14} color="black" title>
              {post?.user?.name}
            </Text>
            <Block row>
              <Text color={$gray} mr={10}>
                {dayjs(post.createAt).format("DD-MM-YYYY")}
              </Text>
              {publicArray.find(item => post?.public === item.id)?.icon}
              {post?.status !== "normal" && post?.status !== "none" && (
                <>
                  <Text ml={10}>
                    {t("FEELING")}
                    {": "}
                    {statusArray.find(item => post?.status.toUpperCase() === item.lable.toUpperCase())?.lable}
                  </Text>
                  {statusArray.find(item => post?.status.toUpperCase() === item.lable.toUpperCase())?.icon}
                </>
              )}
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };
  return (
    <Block bb={{ width: 10, color: $gray3 }}>
      {_renderInfor()}
      <SliderBox
        images={photoList}
        sliderBoxHeight={400}
        dotColor={$primary}
        autoplay={true}
        imageLoadingColor={$primary}
      />
      {post?.body ? (
        <Text pa={10} size={14} color="black" numberOfLines={3}>
          {post?.body}
        </Text>
      ) : null}
      <Interactive post={post} />
    </Block>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: "#f3f3f3",
    borderWidth: 2,
    borderColor: $primary2,
  },
});
