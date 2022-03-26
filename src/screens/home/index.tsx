import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import Header from "../../components/header";
import { PostItem } from "../../components/home/post-item";
import { Stories } from "../../components/home/stories";
import { API_ENDPOINT } from "../../constant";
import { AntIcon, Block, Button, IoIcon, Text } from "../../helper";
import DatePicker from "../../helper/DatePicker";
import Image from "../../helper/Image";
import { $gray3, $primary, $primary2 } from "../../helper/theme";
import { useAppDispatch, useSelector } from "../../hooks";
import useOrientation from "../../hooks/useOrientation";
import { fetchUserInfo } from "../../redux/apis/user";
import { getUserInfo } from "../../redux/slice/UserSlice";
function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { windowWidth } = useOrientation();
  const { t } = useTranslation();

  const token = useSelector(state => state.user.token);
  const userInfo = useSelector(state => state.user.userInfo);

  console.log("userInfo", userInfo);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  return (
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
              dispatch(getUserInfo(token));
              navigation.navigate("ProfileScreen");
            }}
          >
            <Image
              pure
              source={require("../../assets/images/Rose.jpg")}
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
        <Block row style={{ borderBottomWidth: 1, borderBottomColor: $gray3 }}>
          <Button
            row
            center
            middle
            py={10}
            style={{ width: windowWidth / 2, borderRightWidth: 1, borderRightColor: $gray3 }}
          >
            <IoIcon name="image" size={20} color={$primary2} />
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
            <IoIcon name="document-text" size={20} color={$primary2} />
            <Text>{t("STATUS")}</Text>
          </Button>
        </Block>
        <Stories />
        <Block>
          <PostItem />
          <PostItem />
        </Block>
        {/* <Block center middle>
          <Button pa={20} onPress={() => setOpen(true)} style={{ backgroundColor: "blue" }}>
            <Text>Calender</Text>
          </Button>
        </Block> */}
      </ScrollView>
      {/* <DatePicker open={open} setOpen={setOpen} date={date} setDate={setDate} /> */}
      {/* <PostItem />
      <PostItem />
      <PostItem /> */}
    </Block>
  );
}

export default HomeScreen;
