import React from "react";
import { StyleSheet, Modal as ModalBase } from "react-native";
import useOrientation from "../hooks/useOrientation";
import Block from "./Block";
import Button from "./Button";

export interface Props {
  visible?: boolean;
  setVisible?: any;
  width: number;
  height: number;
  radius?: number;
  children?: React.ReactNode;
  style?: any;
}

const Modal: React.FC<Props> = props => {
  const { visible, setVisible, width, height, radius, style, children } = props;
  const { windowWidth, windowHeight } = useOrientation();

  return (
    <ModalBase visible={visible} transparent={true} {...props}>
      <Block
        flex
        style={[
          style,
          {
            position: "absolute",
            backgroundColor: "white",
            width: width,
            height: height,
            zIndex: 10,
            top: (windowHeight - height) / 2,
            left: (windowWidth - width) / 2,
            borderRadius: radius,
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

export default Modal;
