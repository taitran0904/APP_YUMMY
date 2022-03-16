import React from "react";
import { StyleSheet, Modal as ModalBase } from "react-native";
import Block from "./Block";
import Text from "./Text";
import { $gray, $primary, $secondary } from "./theme";

// export interface Props {

// }

const Modal: React.FC = props => {
  const { children } = props;

  // const modalStyles: any = [

  //   style,
  // ];

  return (
    // <TextBase {...props} style={modalStyles}>
    //   {children}
    // </TextBase>
    <ModalBase {...props} style={{ width: 100, height: 100, backgroundColor: "red" }}>
      {children}
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
