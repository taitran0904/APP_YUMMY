import { StyleSheet } from "react-native";
import React from "react";
import { Block, Button, Text } from "../../../helper";
import Image from "../../../helper/Image";
import { useNavigation } from "@react-navigation/native";
import { $primary } from "../../../helper/theme";

type Props = {
  user?: any;
};

const UserItem: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation();
  return (
    // <Button
    //   row
    //   style={{ height: 100, backgroundColor: "#FDE7EB" }}
    //   onPress={() => navigation.navigate("PostDetailScreen")}
    // >
    //   <Block center middle mx={20}>
    //     <Image style={{ width: 60, height: 60, borderRadius: 30 }} />
    //   </Block>
    //   <Block center>
    //     <Text color="black">
    //       <Text title>John </Text>
    //       đã bình luận bài viết của bạn
    //     </Text>
    //     <Text>5 giờ trước</Text>
    //   </Block>
    // </Button>
    <Button
      middle
      row
      py={10}
      px={15}
      onPress={() => {
        navigation.navigate("ProfileScreen", { user });
      }}
    >
      <Image style={{ height: 60, width: 60, borderRadius: 30, borderWidth: 1, borderColor: $primary }} />
      <Block mx={10}>
        <Text title size={16}>
          {user?.name}
        </Text>
        {user.friends.length > 0 && <Text>{user.friends.length} bạn</Text>}
      </Block>
    </Button>
  );
};

const styles = StyleSheet.create({});
export default UserItem;
