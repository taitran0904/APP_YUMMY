import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Block, Button, MaIcon, Text } from "../../../helper";
import Header from "../../header";

const PostDetailScreen: React.FC = () => {
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
        style={{
          height: 50,
        }}
      />
    </>
  );
};
export default PostDetailScreen;
