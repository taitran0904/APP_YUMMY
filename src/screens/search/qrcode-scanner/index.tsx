import { useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCodeScanner from "react-native-qrcode-scanner";
import QRCode from "react-native-qrcode-svg";
import Header from "../../../components/header";
import { IMAGE_BASE_URL } from "../../../constant";
import { Block, Button, MaIcon, Text } from "../../../helper";
import { $primary } from "../../../helper/theme";
import { useSelector } from "../../../hooks";
import { searchQRAPI } from "../../../redux/apis/general";

const QRCodeScannerScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const userInfo: any = useSelector(state => state.user.userInfo);
  const token: any = useSelector(state => state.user.token);
  const [userId, setUserId] = useState<any>("");

  const searchQR = useCallback(async () => {
    try {
      console.log("userId", userId);
      const res: AxiosResponse = await searchQRAPI(token, { userId: userId });
      if (res.data.success === true) {
        setUserId("");
        navigation.navigate("ProfileScreen", { user: res.data.data, isSearch: true });
      }
    } catch (error) {
      //
    }
  }, [userId]);

  useEffect(() => {
    if (userId !== "") searchQR();
  }, [searchQR, userId]);
  console.log("userId", userId);

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
        <QRCodeScanner
          onRead={e => {
            setUserId(e?.data);
          }}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Block>
              <Text>{t("MOVE_CAMERA")}</Text>
            </Block>
          }
          cameraProps={{
            ratio: "1:1",
          }}
          // containerStyle={styles.qrCodeContainer}
          reactivate={true}
          reactivateTimeout={5000}
          showMarker={true}
          markerStyle={{ borderColor: $primary }}
          // bottomContent={
          //   <Block>
          //     <Text>{userId}</Text>
          //   </Block>
          // }
        />
      </Block>
    </>
  );
};

export default QRCodeScannerScreen;
