import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

import { Block, Button, Loading, MaIcon, Text } from "../../../../helper";
import Image from "../../../../helper/Image";
import { $gray, $gray3, $primary } from "../../../../helper/theme";
import Header from "../../../header";
import { updateUserPhoto, updateUserInfo } from "../../../../redux/slice/UserSlice";
import { useAppDispatch, useSelector } from "../../../../hooks";
import { IMAGE_BASE_URL } from "../../../../constant";

// type Props = {
//   newPicture?: any;
//   setNewPicture?: any;
// };

const PreviewScreen: React.FC<Props> = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const userInfo: any = useSelector(state => state.user.userInfo);
  const loading = useSelector(state => state.user.actionLoading);

  const showType: any = route.params.showType;

  const [newPicture, setNewPicture] = useState<any>({
    uri: "",
    name: "",
    photoType: "",
    type: "",
  });
  const [isDelete, setDelete] = useState<boolean>(false);

  useEffect(() => {
    setNewPicture({ ...newPicture, photoType: showType });
  }, [newPicture.uri, showType]);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      setNewPicture({
        ...newPicture,
        uri: image.path,
        name: `${new Date().toISOString()}.jpg`,
        type: image.mime,
        // photoType: showType,
      });
      setDelete(false);
    });
  };
  return (
    <>
      <Header
        left={
          <Block row center middle>
            <Button px={10} onPress={() => navigation.goBack()}>
              <MaIcon name="arrow-back" color="black" size={20} />
            </Button>
          </Block>
        }
        right={
          <Block style={{ alignItems: "flex-end", width: "100%" }}>
            <Button
              row
              mr={15}
              py={5}
              px={10}
              radius={5}
              disabled={newPicture?.uri || isDelete ? false : true}
              style={{ backgroundColor: $primary }}
              onPress={() => {
                isDelete
                  ? showType === "avatar"
                    ? dispatch(updateUserInfo({ avatar: "no-photo" }))
                    : dispatch(updateUserInfo({ cover_photo: "no-photo" }))
                  : dispatch(updateUserPhoto(newPicture));

                setNewPicture({ uri: "", name: "", photoType: "", type: "" });
                setDelete(false);
                loading === false && navigation.goBack();
              }}
            >
              <Text color="white" title>
                {t("UPDATE")}
              </Text>
              {loading && <Loading style={{ marginLeft: 5 }} />}
            </Button>
          </Block>
        }
        style={{
          height: 50,
        }}
      />
      <Block>
        {showType === "avatar" ? (
          <Block center middle style={{ borderBottomWidth: 1, borderBottomColor: $gray, padding: 20 }}>
            {isDelete === true ? (
              <Image pure style={styles.avatar} source={require("../../../../assets/images/no-avatar.png")} />
            ) : (
              <Image
                style={styles.avatar}
                checkEmpty={newPicture?.uri || userInfo?.avatar}
                source={
                  newPicture.uri !== ""
                    ? { uri: newPicture?.uri }
                    : { uri: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}` }
                }
              />
            )}
          </Block>
        ) : (
          <>
            <Block>
              {isDelete === true ? (
                <Image
                  style={{ height: 150 }}
                  pure
                  source={require("../../../../assets/images/no-cover.jpg")}
                />
              ) : newPicture?.uri || userInfo?.cover_photo !== "no-photo" ? (
                <Image
                  style={{ height: 150 }}
                  pure
                  source={
                    newPicture.uri !== ""
                      ? { uri: newPicture?.uri }
                      : { uri: `${IMAGE_BASE_URL}/user/coverPhoto/${userInfo?.cover_photo}` }
                  }
                />
              ) : (
                <Image
                  style={{ height: 150 }}
                  pure
                  source={require("../../../../assets/images/no-cover.jpg")}
                />
              )}
            </Block>
            <Block
              style={{
                marginTop: -40,
                marginLeft: 20,
              }}
            >
              <Image
                checkEmpty={userInfo?.avatar}
                source={{
                  uri: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}`,
                }}
                style={styles.avatarSmall}
              />
            </Block>
          </>
        )}

        <Block row space="around" style={{ marginTop: 20 }}>
          <Button
            center
            middle
            style={styles.button}
            onPress={() => {
              setNewPicture({ uri: "", name: "", photoType: "", type: "" });
              setDelete(true);
            }}
          >
            <Text title color="white">
              {t("DELETE_PICTURE")}
            </Text>
          </Button>
          <Button center middle style={styles.button} onPress={choosePhotoFromLibrary}>
            <Text title color="white">
              {t("CHANGE_PICTURE")}
            </Text>
          </Button>
        </Block>
      </Block>
    </>
  );
};
export default PreviewScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: $primary,
    width: 150,
    height: 50,
    borderRadius: 10,
  },
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: $primary,
  },
  avatarSmall: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
});
