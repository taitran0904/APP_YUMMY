import React from "react";
import { StyleSheet, Modal as ModalBase } from "react-native";
import Block from "./Block";
import Button from "./Button";
import Text from "./Text";
import { $gray, $primary, $secondary } from "./theme";

// export interface Props {

// }

const Modal: React.FC = props => {
  const { children, visible, setModalVisible } = props;

  // const modalStyles: any = [

  //   style,
  // ];

  return (
    // <TextBase {...props} style={modalStyles}>
    //   {children}
    // </TextBase>
    <ModalBase
      visible={visible}
      transparent={true}
      {...props}
      style={{ width: 100, height: 100, backgroundColor: "red" }}
    >
      <Block>{children}</Block>
      <Button />
    </ModalBase>
  );
};

export default Modal;

const styles: any = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    textAlign: "center",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },

  primary: { color: $primary },
  secondary: { color: $secondary },
});
