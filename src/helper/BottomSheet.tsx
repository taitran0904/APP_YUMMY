import React from "react";
import { StyleSheet, Modal as ModalBase } from "react-native";
import useOrientation from "../hooks/useOrientation";
import Block from "./Block";
import Button from "./Button";

export interface Props {
  visible?: boolean;
  setVisible?: any;
  height: number;
  radius?: number;
  children?: React.ReactNode;
  style?: any;
}

const BottomSheet: React.FC<Props> = props => {
  const { visible, setVisible, height, radius, style, children } = props;
  const { windowWidth, windowHeight } = useOrientation();

  return (
    <ModalBase animationType="slide" visible={visible} transparent={true} {...props}>
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
        {children}
      </Block>
      <Button
        flex
        style={{ backgroundColor: "rgba(0,0,0,0.2)", flex: 1 }}
        onPress={() => setVisible(false)}
      />
    </ModalBase>
  );
};

export default BottomSheet;
