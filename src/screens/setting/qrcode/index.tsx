import { useNavigation } from "@react-navigation/native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import Header from "../../../components/header";
import { IMAGE_BASE_URL } from "../../../constant";
import { Block, Button, MaIcon, Text } from "../../../helper";
import { $primary } from "../../../helper/theme";
import { useSelector } from "../../../hooks";

const QRCodeScreen: React.FC = () => {
  const navigation = useNavigation();

  const userInfo: any = useSelector(state => state.user.userInfo);
  return (
    <>
      <Header
        left={
          <Button px={10} onPress={() => navigation.goBack()}>
            <MaIcon name="arrow-back" color="black" size={20} />
          </Button>
        }
        style={{ height: 50 }}
      />
      <Block center middle flex>
        <QRCode
          size={300}
          color={$primary}
          value={userInfo._id}
          logo={{ uri: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}` }}
          logoSize={50}
          logoBackgroundColor="white"
          logoBorderRadius={50}
        />
        <Block py={80}>
          <Text title size={32} color="black">
            {userInfo.name}
          </Text>
        </Block>
      </Block>
    </>
  );
};

export default QRCodeScreen;
