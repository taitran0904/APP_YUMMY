import { StyleSheet } from "react-native";
import React from "react";
import { Block, Button, Text } from "../../../helper";
import Image from "../../../helper/Image";
import { useNavigation } from "@react-navigation/native";

const UserItem: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Button
      row
      style={{ height: 100, backgroundColor: "#FDE7EB" }}
      onPress={() => navigation.navigate("PostDetailScreen")}
    >
      <Block center middle mx={20}>
        <Image style={{ width: 60, height: 60, borderRadius: 30 }} />
      </Block>
      <Block center>
        <Text color="black">
          <Text title>John </Text>
          đã bình luận bài viết của bạn
        </Text>
        <Text>5 giờ trước</Text>
      </Block>
    </Button>
  );
};

const styles = StyleSheet.create({});
export default UserItem;
