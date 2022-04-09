import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Image as IM } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Modalize } from "react-native-modalize";
import { IMAGE_BASE_URL } from "../../../constant";
import { AntIcon, Block, Button, MaIcon, Text } from "../../../helper";
import Image from "../../../helper/Image";
import { $primary } from "../../../helper/theme";
import { useAppDispatch, useSelector } from "../../../hooks";
import useOrientation from "../../../hooks/useOrientation";
import { updateUserInfoAPI } from "../../../redux/apis/user";
import { updateUserPhoto } from "../../../redux/slice/UserSlice";
import BottomSheet from "../bottom-sheet";

type Props = {
  userInfo: {
    avatar?: string;
    name?: string;
    from?: string;
    birthday?: string;
    occupation?: string;
    description?: string;
    cover_photo?: string;
  };
};
const Information: React.FC<Props> = props => {
  const { userInfo } = props;
  const { t } = useTranslation();

  const [viewImage, setViewImage] = useState<any>(null);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [showType, setShowType] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [newPicture, setNewPicture] = useState<any>({});

  const checkTypeShow = (type: any) => {
    if (type === "avatar" || type === "banner") {
      return viewImage;
    }
    // if (type === 'gallery') {
    //   return images.map((item:any) => {
    //     return {
    //       url: item.image,
    //       freeHeight: true,
    //     };
    //   });
    // }
  };

  return (
    <>
      <Block>
        <Button
          onPress={() => {
            setShowType("banner");
            userInfo?.cover_photo !== "no-photo"
              ? setViewImage([{ uri: `${IMAGE_BASE_URL}/user/coverPhoto/${userInfo?.cover_photo}` }])
              : setViewImage([require("../../../assets/images/no-cover.jpg")]);
            setVisible(true);
          }}
        >
          {userInfo?.cover_photo !== "no-photo" ? (
            <Image
              source={{
                uri: `${IMAGE_BASE_URL}/user/coverPhoto/${userInfo?.cover_photo}`,
              }}
              pure
              style={{ height: 150 }}
            />
          ) : (
            <Image pure source={require("../../../assets/images/no-cover.jpg")} style={{ height: 150 }} />
          )}
        </Button>
        <Block>
          <Button
            style={{
              marginTop: -40,
              marginLeft: 20,
              width: 100,
              borderRadius: 50,
            }}
            onPress={() => {
              setShowType("avatar");
              setViewImage([{ url: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}` }]);
              setVisible(true);
            }}
          >
            <Image
              checkEmpty={userInfo?.avatar}
              source={{
                uri: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}`,
              }}
              style={styles.avatar}
            />
          </Button>
          <Text size={20} title ml={20} style={{ width: 300 }}>
            {userInfo?.name || ""}
          </Text>
          <Block ml={15}>
            <Text my={5} color="black">
              {userInfo?.description || ""}
            </Text>
            <Block row mb={5}>
              <AntIcon name="enviromento" size={20} color="black" style={{ marginRight: 5 }} />
              <Text color="black">{userInfo?.from || ""}</Text>
            </Block>
            <Block row mb={5}>
              <AntIcon name="gift" size={20} color="black" style={{ marginRight: 5 }} />
              <Text color="black">{dayjs(userInfo?.birthday).format("DD-MM-YYYY") || ""}</Text>
            </Block>
            <Block row mb={5}>
              <MaIcon name="work-outline" size={20} color="black" style={{ marginRight: 5 }} />
              <Text color="black">{userInfo?.occupation || ""}</Text>
            </Block>
          </Block>
          <Button
            ma={20}
            px={15}
            py={5}
            radius={5}
            style={{ position: "absolute", right: 0, backgroundColor: $primary }}
          >
            <Text title size={14} color="white">
              {t("FOLLOW")}
            </Text>
          </Button>
        </Block>
      </Block>
      <Modal
        visible={viewImageModal}
        transparent={true}
        onRequestClose={() => {
          setViewImageModal(false);
        }}
      >
        <ImageViewer
          renderHeader={() => {
            return (
              <Button
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  zIndex: 100000,
                }}
                onPress={() => {
                  setViewImageModal(false);
                }}
              >
                <AntIcon name="close" size={28} color="white" />
              </Button>
            );
          }}
          enableImageZoom
          enablePreload
          imageUrls={checkTypeShow(showType)}
          enableSwipeDown={true}
          onSwipeDown={() => setViewImageModal(false)}
        />
      </Modal>
      <BottomSheet
        height={230}
        radius={10}
        visible={visible}
        setVisible={setVisible}
        setViewImageModal={setViewImageModal}
        setNewPicture={setNewPicture}
        newPicture={newPicture}
        showType={showType}
      />
    </>
  );
};
export default Information;

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
});
