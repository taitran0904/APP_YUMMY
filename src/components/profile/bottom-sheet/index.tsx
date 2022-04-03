import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Modal } from "react-native";
import { Block, Button, Text } from "../../../helper";
import { $gray3, $primary } from "../../../helper/theme";
import useOrientation from "../../../hooks/useOrientation";

export interface Props {
  visible?: boolean;
  setVisible?: any;
  height: number;
  radius?: number;
  setViewImageModal?: any;
  style?: any;
}

const BottomSheet: React.FC<Props> = props => {
  const { t } = useTranslation();
  const { visible, setVisible, height, radius, style, setViewImageModal } = props;
  const { windowWidth, windowHeight } = useOrientation();

  const buttonGroup = [
    {
      title: t("SEE_PICTURE"),
      backgroundColor: $primary,
      color: "white",

      onPress: () => {
        setVisible(false);
        setViewImageModal(true);
      },
    },
    {
      title: t("UPDATE_PHOTO"),
      backgroundColor: $primary,
      color: "white",

      onPress: () => {
        console.log("see picture");
      },
    },
    {
      title: t("CANCEL"),
      backgroundColor: $gray3,
      color: $primary,
      onPress: () => {
        console.log("see picture");
      },
    },
  ];

  return (
    <Modal animationType="slide" visible={visible} transparent={true} {...props}>
      <Block
        flex
        style={[
          style,
          {
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
            height: height,
            zIndex: 10,
            bottom: 0,
            borderTopRightRadius: radius,
            borderTopLeftRadius: radius,
          },
        ]}
      >
        <Block center middle mt={10}>
          {buttonGroup.map((item, index) => (
            <Button
              center
              middle
              key={index}
              my={10}
              onPress={item.onPress}
              style={{
                width: windowWidth - 40,
                backgroundColor: item.backgroundColor,
                height: 50,
                borderRadius: 10,
              }}
            >
              <Text title color={item.color}>
                {item.title}
              </Text>
            </Button>
          ))}
        </Block>
      </Block>
      <Button
        flex
        style={{ backgroundColor: "rgba(0,0,0,0.2)", flex: 1 }}
        onPress={() => setVisible(false)}
      />
    </Modal>
  );
};

export default BottomSheet;
