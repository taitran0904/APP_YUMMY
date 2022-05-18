import { StyleSheet } from "react-native";
import React from "react";
import { Block, Button, Text } from "../../../helper";
import Image from "../../../helper/Image";
import { useNavigation } from "@react-navigation/native";
import { $gray3, $primary } from "../../../helper/theme";
import useOrientation from "../../../hooks/useOrientation";
import { IMAGE_BASE_URL } from "../../../constant";

type Props = {
  user?: any;
  setSearch?: any;
};

const UserItem: React.FC<Props> = ({ user, setSearch }) => {
  const navigation = useNavigation();
  const { windowWidth } = useOrientation();
  return (
    <Button
      middle
      py={10}
      px={15}
      // shadow
      onPress={() => {
        navigation.navigate("ProfileScreen", { user, isSearch: true });
        setSearch("");
      }}
      style={{
        width: (windowWidth - 60) / 2,
        height: 100,
        // backgroundColor: $primary,
        marginHorizontal: 10,
        marginTop: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: $gray3,
      }}
    >
      <Block style={{ position: "absolute", marginTop: -40 }}>
        <Image
          source={{
            uri: `${IMAGE_BASE_URL}/user/avatar/${user?.avatar}`,
          }}
          style={{ height: 80, width: 80, borderRadius: 50, borderWidth: 1, borderColor: $primary }}
        />
      </Block>
      <Block middle mx={10} style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text title size={16}>
          {user?.name}
        </Text>
        {user?.friends?.length > 0 ? <Text>{user.friends.length} bạn</Text> : <Block />}
      </Block>
    </Button>
  );
};

const styles = StyleSheet.create({});
export default UserItem;
