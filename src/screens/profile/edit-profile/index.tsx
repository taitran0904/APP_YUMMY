import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import Header from "../../../components/header";
import { Block, Button, MaIcon, Text } from "../../../helper";

const EditProfileScreen: React.FC = ({ route }) => {
  const { userInfo } = route.params;
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
            <Block>
              <Text color="black">John</Text>
              {userInfo?.friends.length > 0 && (
                <Text>
                  {userInfo?.friends.length} {t("FOLLOWERS")}
                </Text>
              )}
            </Block>
          </Block>
        }
        centerStyle={{
          flex: 0,
        }}
        style={{ height: 50 }}
      />
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </>
  );
};

export default EditProfileScreen;
