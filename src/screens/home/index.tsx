import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView } from "react-native";
import Header from "../../components/header";
import { PostItem } from "../../components/home/post-item";
import { Stories } from "../../components/home/stories";
import { IMAGE_BASE_URL } from "../../constant";
import { AntIcon, Block, Button, IoIcon, Text } from "../../helper";
import DatePicker from "../../helper/DatePicker";
import Image from "../../helper/Image";
import { $gray3, $primary, $primary2 } from "../../helper/theme";
import { useAppDispatch, useSelector } from "../../hooks";
import useOrientation from "../../hooks/useOrientation";
import { getUserInfo } from "../../redux/slice/UserSlice";
function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { windowWidth } = useOrientation();
  const { t } = useTranslation();

  const token = useSelector(state => state.user.token);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const postList = useSelector((state: any) => state.post.posts?.data);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserInfo(token));
  }, [token]);

  return (
    <>
      <Block>
        <Header
          left={
            <Image
              pure
              source={require("../../assets/images/Yummy_app.png")}
              style={{ width: 94, height: 42 }}
            />
          }
          // center={<AntIcon name="user" size={24} color="black" />}
          right={
            <Button
              onPress={() => {
                navigation.navigate("ProfileScreen");
              }}
            >
              <Image
                checkEmpty={userInfo?.avatar}
                source={{
                  uri: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}`,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: $primary,
                }}
              />
            </Button>
          }
          centerStyle={{ flex: 0 }}
          rightStyle={{
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: 10,
          }}
          leftStyle={{
            marginLeft: 10,
          }}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: $gray3,
            height: 100,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RefreshControl>
            <Block row style={{ borderBottomWidth: 1, borderBottomColor: $gray3 }}>
              <Button
                row
                center
                middle
                py={10}
                onPress={() => navigation.navigate("CreateImagePostScreen")}
                style={{ width: windowWidth / 2, borderRightWidth: 1, borderRightColor: $gray3 }}
              >
                <IoIcon name="image" size={20} color={$primary} />
                <Text>{t("IMAGE")}</Text>
              </Button>
              <Button
                row
                center
                middle
                py={10}
                style={{ width: windowWidth / 2 }}
                onPress={() => navigation.navigate("CreatePostScreen")}
              >
                <IoIcon name="document-text" size={20} color={$primary} />
                <Text>{t("STATUS")}</Text>
              </Button>
            </Block>
            {/* <Stories /> */}
            <Block pb={100}>
              {postList?.map((item: any, index: number) => (
                <PostItem key={index} post={item} />
              ))}
            </Block>
          </RefreshControl>
        </ScrollView>
      </Block>
    </>
  );
}

export default HomeScreen;
