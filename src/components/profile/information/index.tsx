import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Image as IM } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { IMAGE_BASE_URL } from "../../../constant";
import { AntIcon, Block, Button, Loading, MaIcon, Text } from "../../../helper";
import Image from "../../../helper/Image";
import { $gray3, $primary } from "../../../helper/theme";
import { useAppDispatch, useSelector } from "../../../hooks";
import { accecptFriendAPI, declineFriendAPI, sendInvitationsAPI } from "../../../redux/apis/friend";
import { getFriendRequest } from "../../../redux/slice/FriendSlice";
import { getUserInfo } from "../../../redux/slice/UserSlice";
import BottomSheet from "../bottom-sheet";

type Props = {
  userInfo: {
    _id?: string;
    avatar?: string;
    name?: string;
    from?: string;
    birthday?: string;
    occupation?: string;
    description?: string;
    cover_photo?: string;
    friends?: any;
  };
  setFollow?: any;
  isFollow?: any;
  checkAccept?: any;
  infoOthers?: any;
  isFriend?: any;
  setCheckAccept?: any;
};
const Information: React.FC<Props> = props => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userInfo, setFollow, isFollow, checkAccept, isFriend, setCheckAccept } = props;

  const user: any = useSelector(state => state.user.userInfo);
  const token: any = useSelector(state => state.user.token);

  const [viewImage, setViewImage] = useState<any>(null);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [showType, setShowType] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [newPicture, setNewPicture] = useState<any>({});
  const [loading, setLoading] = useState<string>("");

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

  const follow = useCallback(async () => {
    try {
      setLoading("follow");
      await sendInvitationsAPI(token, userInfo._id);
      setFollow(true);
      setLoading("");
    } catch (error) {
      setLoading("");
    }
  }, []);

  const accept = useCallback(async () => {
    try {
      setLoading("accept");
      await accecptFriendAPI(token, checkAccept);
      dispatch(getUserInfo(token));
      dispatch(getFriendRequest());
      setFollow(false);
      setLoading("");
    } catch (error) {
      setLoading("");
    }
  }, [checkAccept]);

  const decline = useCallback(async () => {
    try {
      setLoading("decline");
      await declineFriendAPI(token, checkAccept);
      dispatch(getUserInfo(token));
      dispatch(getFriendRequest());
      setCheckAccept("");
      setLoading("");
    } catch (error) {
      setLoading("");
    }
  }, [checkAccept]);

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
              <Text color="black">{userInfo.from ? userInfo.from : t("NOT_UPDATED")}</Text>
            </Block>
            <Block row mb={5}>
              <AntIcon name="gift" size={20} color="black" style={{ marginRight: 5 }} />
              <Text color="black">
                {userInfo?.birthday !== null
                  ? dayjs(userInfo.birthday).format("DD-MM-YYYY")
                  : t("NOT_UPDATED")}
              </Text>
            </Block>
            <Block row mb={5}>
              <MaIcon name="work-outline" size={20} color="black" style={{ marginRight: 5 }} />
              <Text color="black">{userInfo.occupation ? userInfo.occupation : t("NOT_UPDATED")}</Text>
            </Block>
          </Block>
          {userInfo?._id !== user?._id && checkAccept === "" && isFriend === false && (
            <Block mr={10} mt={10} style={{ position: "absolute", right: 0 }}>
              <Button
                disabled={isFollow}
                center
                middle
                radius={5}
                onPress={follow}
                style={{ backgroundColor: $primary, width: 60, height: 35 }}
              >
                {loading === "follow" ? (
                  <Loading color="white" />
                ) : isFollow === false ? (
                  <Text title size={14} color="white">
                    {t("FOLLOW")}
                  </Text>
                ) : (
                  <Text title size={14} color="white">
                    {t("WAITING")}
                  </Text>
                )}
              </Button>
            </Block>
          )}
          {userInfo?._id !== user?._id && checkAccept !== "" && isFriend === false && (
            <Block row flex mr={10} mt={10} style={{ position: "absolute", right: 0 }}>
              <Button py={5} px={10} mr={10} radius={5} onPress={decline} style={{ backgroundColor: $gray3 }}>
                <Text title size={14} color={$primary}>
                  {t("DECLINE")}
                </Text>
              </Button>
              <Button py={5} px={10} radius={5} onPress={accept} style={{ backgroundColor: $primary }}>
                {loading === "accept" ? (
                  <Loading color="white" />
                ) : (
                  <Text title size={14} color="white">
                    {t("ACCECPT")}
                  </Text>
                )}
              </Button>
            </Block>
          )}
          {isFriend === true && (
            <Block mr={10} mt={10} style={{ position: "absolute", right: 0 }}>
              <Block center middle radius={5} style={{ backgroundColor: $primary, width: 80, height: 35 }}>
                <Text title size={14} color="white">
                  {t("FOLLOWING")}
                </Text>
              </Block>
            </Block>
          )}
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
