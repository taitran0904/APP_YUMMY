import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/header";
import { IMAGE_BASE_URL } from "../../constant";
import { Block, Button, FEIcon, Input, IoIcon, MaIcon, Modal, Text } from "../../helper";
import Image from "../../helper/Image";
import { $primary } from "../../helper/theme";
import { useSelector } from "../../hooks";

const CreatePostScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const userInfo: any = useSelector(state => state.user.userInfo);

  const [post, setPost] = useState<any>({
    public: 0,
    state: "none",
    body: "",
    photos: [],
    photoFiles: [],
    icon_source: null,
  });
  const [visible, setVisible] = useState<boolean>(false);

  const publicArray = [
    {
      lable: t("PUBLIC"),
      icon: <IoIcon name="earth" size={30} color={$primary} />,
      iconType: "IoIcon",
      iconName: "earth",
    },
    {
      lable: t("FRIEND_ONLY"),
      icon: <FEIcon name="users" size={30} color={$primary} />,
      iconType: "FEIcon",
      iconName: "users",
    },
    {
      lable: t("PUBLIC"),
      icon: <FEIcon name="lock" size={30} color={$primary} />,
      iconType: "FEIcon",
      iconName: "lock",
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
        <Block row>
          <Button row middle mb={15} mx={10} onPress={() => navigation.navigate("ProfileScreen")}>
            <Image
              checkEmpty={userInfo?.avatar}
              source={{ uri: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}` }}
              style={{ width: 40, height: 40, borderRadius: 25 }}
            />
            <Text title color="black" size={18} ml={10}>
              Tai tran
            </Text>
          </Button>
          <Block>
            <Button onPress={() => setVisible(true)}>
              <Text>dcdcd</Text>
            </Button>
          </Block>
        </Block>
        <Block>
          <Input
            onChangeText={(e: string) => setPost({ ...post, body: e })}
            style={{ backgroundColor: "red", height: 300 }}
          />
        </Block>
      </Block>
      <Modal
        width={300}
        height={80}
        visible={visible}
        setVisible={setVisible}
        radius={10}
        style={{ overflow: "hidden" }}
      >
        <Block row space="between">
          {publicArray.map((item: any, index: number) => (
            <Button
              key={index}
              center
              middle
              style={{
                borderRightWidth: index !== 2 ? 1 : 0,
                borderRightColor: $primary,
                width: 100,
                height: 80,
              }}
            >
              {item.icon}
              <Text size={16} color="black">
                {item.lable}
              </Text>
            </Button>
          ))}
        </Block>
      </Modal>
    </>
  );
};

export default CreatePostScreen;
