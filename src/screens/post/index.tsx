import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/header";
import { Block, Button, Input, MaIcon, Text } from "../../helper";
import Image from "../../helper/Image";
import { $primary } from "../../helper/theme";

const CreatePostScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
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
        <Button row middle mb={15} mx={10} onPress={() => navigation.navigate("ProfileScreen")}>
          <Image style={{ width: 40, height: 40, borderRadius: 25 }} />
          <Text title color="black" size={18} ml={10}>
            Tai tran
          </Text>
        </Button>
        <Block>
          <Input style={{ backgroundColor: "red", height: 300 }} />
        </Block>
      </Block>
    </>
  );
};

export default CreatePostScreen;
