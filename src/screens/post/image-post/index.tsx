import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../../components/header";
import { IMAGE_BASE_URL } from "../../../constant";
import { AntIcon, Block, Button, FEIcon, Input, IoIcon, MaIcon, Modal, Text } from "../../../helper";
import Image from "../../../helper/Image";
import { $gray3, $primary } from "../../../helper/theme";
import { useSelector } from "../../../hooks";

const CreateImagePostScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const userInfo: any = useSelector(state => state.user.userInfo);

  const [post, setPost] = useState<any>({
    public: 0,
    status: "none",
    body: "",
    photos: [],
    photoFiles: [],
    icon_source: null,
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<any>();

  const publicArray = [
    {
      lable: t("PUBLIC"),
      icon: <IoIcon name="earth" size={30} color={$primary} />,
    },
    {
      lable: t("FRIEND_ONLY"),
      icon: <FEIcon name="users" size={30} color={$primary} />,
    },
    {
      lable: t("PUBLIC"),
      icon: <FEIcon name="lock" size={30} color={$primary} />,
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
            <Button mr={15} py={5} px={10} radius={5} style={{ backgroundColor: $primary }}>
              <Text color="white" title>
                {t("POST")}
              </Text>
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
              <Text>{publicArray.find(index => index === post.public)?.lable || t("PUBLIC")}</Text>
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
          <Button>
            <Image pure source={require("../../../assets/images/image.png")} />
          </Button>
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
    </>
  );
};

export default CreateImagePostScreen;
