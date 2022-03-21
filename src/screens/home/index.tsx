import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import Header from "../../components/header";
import { PostItem } from "../../components/home/post-item";
import { Stories } from "../../components/home/stories";
import { AntIcon, Block, Button, IoIcon, Text } from "../../helper";
import DatePicker from "../../helper/DatePicker";
import { $gray3, $primary2 } from "../../helper/theme";
import useOrientation from "../../hooks/useOrientation";
function HomeScreen() {
  const navigation = useNavigation();
  const { windowWidth } = useOrientation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  return (
    <Block>
      <Header
        left={<AntIcon name="user" size={24} color="black" />}
        // center={<AntIcon name="user" size={24} color="black" />}
        right={
          <Button onPress={() => navigation.navigate("ProfileScreen")}>
            <Text>cdcdc</Text>
          </Button>
        }
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
          <Button row center middle py={10} style={{ width: windowWidth / 2 }}>
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
