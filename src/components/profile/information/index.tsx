import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { IMAGE_BASE_URL } from "../../../constant";
import { AntIcon, Block, Button, MaIcon, Text } from "../../../helper";
import Image from "../../../helper/Image";
import { $primary } from "../../../helper/theme";

type Props = {
  userInfo: {
    avatar?: string;
    name?: string;
    from?: string;
    date_of_birth?: string;
    occupation?: string;
  };
};
const Information: React.FC<Props> = props => {
  const { userInfo } = props;
  const { t } = useTranslation();

  const [viewImage, setViewImage] = useState<any>(null);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [showType, setShowType] = useState<any>(null);

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
        <Image pure source={require("../../../assets/images/bg.jpg")} style={{ height: 150 }} />
        <Block>
          <Button
            style={{
              marginTop: -40,
              marginLeft: 20,
            }}
            onPress={() => {
              setViewImageModal(true);
              setShowType("avatar");
              setViewImage([{ url: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}` }]);
            }}
          >
            <Image
              checkEmpty={userInfo?.avatar}
              source={{
                uri: `${IMAGE_BASE_URL}/user/avatar/${userInfo?.avatar}`,
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "white",
              }}
            />
          </Button>
          <Text size={20} title ml={20} style={{ width: 300 }}>
            {userInfo?.name}
          </Text>
          <Block ml={15}>
            <Text my={5} color="black">
              Thích những món ăn ngon{" "}
            </Text>
            <Block row mb={5}>
              <AntIcon name="enviromento" size={20} color="black" />
              <Text color="black">{userInfo?.from}</Text>
            </Block>
            <Block row mb={5}>
              <AntIcon name="gift" size={20} color="black" />
              <Text color="black">{userInfo?.date_of_birth}</Text>
            </Block>
            <Block row mb={5}>
              <MaIcon name="work-outline" size={20} color="black" />
              <Text color="black">{userInfo?.occupation}</Text>
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
    </>
  );
};
export default Information;
