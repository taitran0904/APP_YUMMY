import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ImagePicker from "react-native-image-crop-picker";

import Header from "../../../components/header";
import { IMAGE_BASE_URL } from "../../../constant";
import {
  AntIcon,
  Block,
  Button,
  FAIcon,
  FEIcon,
  Input,
  IoIcon,
  Loading,
  MaIcon,
  Modal,
  Text,
} from "../../../helper";
import Image from "../../../helper/Image";
import { $gray3, $primary } from "../../../helper/theme";
import { useAppDispatch, useSelector } from "../../../hooks";
import { createPost } from "../../../redux/slice/PostSlice";
import useOrientation from "../../../hooks/useOrientation";

const CreateImagePostScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const userInfo: any = useSelector(state => state.user.userInfo);
  const loading: any = useSelector(state => state.post.actionLoading);

  const { windowWidth } = useOrientation();

  const [post, setPost] = useState<any>({
    public: 0,
    status: "normal",
    body: "",
    photos: [],
    photoFiles: [],
    icon_source: null,
  });

  const [visible, setVisible] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<any>();
  const [chooseUpload, setChooseUpload] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const [imageActive, setImageActive] = useState<any>();

  const publicArray = [
    {
      id: 0,
      lable: t("PUBLIC"),
      icon: <IoIcon name="earth" size={30} color={$primary} />,
      icon2: <IoIcon name="earth" size={20} color={$primary} />,
    },
    {
      id: 1,
      lable: t("FRIEND_ONLY"),
      icon: <FEIcon name="users" size={30} color={$primary} />,
      icon2: <FEIcon name="users" size={20} color={$primary} />,
    },
    {
      id: 2,
      lable: t("ONLY_ME"),
      icon: <FEIcon name="lock" size={30} color={$primary} />,
      icon2: <FEIcon name="lock" size={20} color={$primary} />,
    },
  ];

  const statusArray = [
    {
      lable: t("NONE"),
      icon: <AntIcon name="close" size={30} />,
    },
    {
      lable: t("HAPPY"),
      icon: (
        <Image style={{ height: 30, width: 30 }} pure source={require("../../../assets/icons/happy.png")} />
      ),
    },
    {
      lable: t("SAD"),
      icon: (
        <Image style={{ height: 30, width: 30 }} pure source={require("../../../assets/icons/sad.png")} />
      ),
    },
    {
      lable: t("ANGRY"),
      icon: (
        <Image style={{ height: 30, width: 30 }} pure source={require("../../../assets/icons/angry.png")} />
      ),
    },
    {
      lable: t("SURPRISED"),
      icon: (
        <Image
          style={{ height: 30, width: 30 }}
          pure
          source={require("../../../assets/icons/surprised.png")}
        />
      ),
    },
  ];

  const checkEmpty = () => {
    if (post.body !== "" || post.photos.length > 0) return false;
    return true;
  };

  const takePhotoWithCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      const newPicture = {
        uri: image.path,
        name: `${new Date().toISOString()}.jpg`,
        type: image.mime,
      };
      const photosClone = [...post.photos];
      photosClone.push(newPicture);
      setPost({ ...post, photos: photosClone });
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      const newPicture = {
        uri: image.path,
        name: `${new Date().toISOString()}.jpg`,
        type: image.mime,
      };
      const photosClone = [...post.photos];
      photosClone.push(newPicture);
      setPost({ ...post, photos: photosClone });
    });
  };

  const photoList = () => {
    return (
      <Block mx={1} row wrap>
        {post.photos.map((item: any, index: number) => (
          <Button
            key={index}
            onLongPress={() => {
              setConfirm(true);
              setImageActive(index);
            }}
          >
            <Image
              key={index}
              checkEmpty={item.uri}
              source={{ uri: item.uri }}
              style={{ width: (windowWidth - 8) / 3, height: (windowWidth - 8) / 3, margin: 1 }}
            />
          </Button>
        ))}
        <Button
          center
          middle
          style={{
            height: (windowWidth - 8) / 3,
            width: (windowWidth - 8) / 3,
            backgroundColor: $gray3,
            margin: 1,
          }}
          onPress={() => setChooseUpload(true)}
        >
          <Image
            pure
            source={require("../../../assets/images/add_image.png")}
            style={{ height: 50, width: 50 }}
          />
        </Button>
      </Block>
    );
  };

  return (
    <>
      <Header
        left={
          <Block row center middle>
            <Button px={10} onPress={() => navigation.goBack()}>
              <MaIcon name="arrow-back" color="black" size={20} />
            </Button>
            <Text color="black">{t("CREATE_POST")}</Text>
          </Block>
        }
        right={
          <Block style={{ alignItems: "flex-end", width: "100%" }}>
            <Button
              disabled={checkEmpty()}
              mr={15}
              py={5}
              px={20}
              radius={5}
              onPress={() => {
                if (checkEmpty() === false) {
                  dispatch(createPost(post));
                  navigation.goBack();
                } else null;
              }}
              style={{ backgroundColor: $primary }}
            >
              {loading ? <Loading color="white" /> : <Text color="white">{t("POST")}</Text>}
            </Button>
          </Block>
        }
        style={{
          height: 50,
        }}
      />
      <Block my={20}>
        <Block row middle mb={15} space="between">
          <Button row middle mx={10} onPress={() => navigation.navigate("ProfileScreen")}>
            <Image
              checkEmpty={userInfo?.avatar}
              source={{ uri: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}` }}
              style={{ width: 40, height: 40, borderRadius: 25 }}
            />
            <Text title color="black" size={18} ml={10}>
              Tai tran
            </Text>
          </Button>
          <Block row middle mr={10}>
            <Button
              row
              mr={10}
              pa={3}
              onPress={() => {
                setVisible(true);
                setDataModal(publicArray);
              }}
              style={{ borderRadius: 5, borderWidth: 1, borderColor: $gray3 }}
            >
              <Text size={14} color="black">
                {t("PRIVACY")}:{" "}
              </Text>
              {publicArray.find(item => item.id === post?.public)?.icon2 || (
                <IoIcon name="earth" size={20} color={$primary} />
              )}
            </Button>
            <Button
              row
              pa={3}
              onPress={() => {
                setVisible(true);
                setDataModal(statusArray);
              }}
              style={{ borderRadius: 5, borderWidth: 1, borderColor: $gray3 }}
            >
              <Text size={14} color="black">
                {t("FEELING")}:{" "}
              </Text>
              <Text>{post.status}</Text>
            </Button>
          </Block>
        </Block>
        <Block>
          <Input
            placeholder={t("WHAT_ARE_YOU_THINKING")}
            textSize={14}
            multiline
            numberOfLines={3}
            onChangeText={(e: string) => setPost({ ...post, body: e })}
            style={{ paddingHorizontal: 15 }}
          />
          {post?.photos?.length > 0 ? (
            photoList()
          ) : (
            <Button
              center
              middle
              style={{ height: 150, width: "100%", backgroundColor: $gray3 }}
              onPress={() => setChooseUpload(true)}
            >
              <Image
                pure
                source={require("../../../assets/images/add_image.png")}
                style={{ height: 100, width: 100 }}
              />
            </Button>
          )}
        </Block>
      </Block>
      <Modal
        width={300}
        height={dataModal?.length === 3 ? 80 : 300}
        visible={visible}
        setVisible={setVisible}
        radius={10}
        style={{ overflow: "hidden" }}
      >
        <Block style={{ flexDirection: dataModal?.length === 3 ? "row" : "column" }}>
          {dataModal?.map((item: any, index: number) => (
            <Button
              key={index}
              row={dataModal.length === 3 ? false : true}
              center
              middle
              onPress={() => {
                dataModal.length === 3
                  ? setPost({ ...post, public: index })
                  : setPost({ ...post, status: item.lable });
                setVisible(false);
              }}
              style={{
                borderRightWidth: dataModal.length === 3 ? (index !== 2 ? 1 : 0) : 0,
                borderBottomWidth: dataModal.length === 3 ? 0 : index !== 4 ? 1 : 0,
                borderColor: $primary,
                width: dataModal.length === 3 ? 100 : 300,
                height: dataModal.length === 3 ? 80 : 60,
              }}
            >
              {item.icon}
              <Text size={16} color="black" style={{ marginLeft: dataModal.length === 3 ? 0 : 5 }}>
                {item.lable}
              </Text>
            </Button>
          ))}
        </Block>
      </Modal>
      <Modal
        width={280}
        height={100}
        visible={chooseUpload}
        setVisible={setChooseUpload}
        radius={10}
        style={{ overflow: "hidden" }}
      >
        <Block row>
          <Button
            center
            middle
            style={{
              height: 100,
              width: 140,
              borderRightWidth: 1,
              borderColor: $gray3,
            }}
            onPress={() => {
              choosePhotoFromLibrary();
              setChooseUpload(false);
            }}
          >
            <FAIcon name="upload" size={20} color={$primary} />
            <Text numberOfLines={2} center style={{ width: 140 }}>
              {t("CHOOSE_FROM_LIBRARY")}
            </Text>
          </Button>
          <Button
            center
            middle
            onPress={() => {
              takePhotoWithCamera();
              setChooseUpload(false);
            }}
            style={{ height: 100, width: 140 }}
          >
            <FAIcon name="camera-retro" size={20} color={$primary} />
            <Text center>{t("TAKE_A_PHOTO")}</Text>
          </Button>
        </Block>
      </Modal>
      <Modal
        width={300}
        height={140}
        visible={isConfirm}
        setVisible={setConfirm}
        radius={10}
        style={{ overflow: "hidden" }}
      >
        <Block>
          <Text center size={20} pa={20} color="black">
            {t("DO_YOU_WANT_TO_DELETE_THIS_PICTURE")}
          </Text>
          <Block row style={{ borderTopWidth: 1, borderColor: $gray3 }}>
            <Button middle center style={{ height: 50, width: 150 }}>
              <Text color="black" center>
                {t("CANCEL")}
              </Text>
            </Button>
            <Button
              middle
              center
              onPress={() => {
                post.photos.splice(imageActive, 1);
                setConfirm(false);
              }}
              style={{ height: 50, width: 150 }}
            >
              <Text color="black" center>
                {t("DELETE")}
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    </>
  );
};

export default CreateImagePostScreen;
