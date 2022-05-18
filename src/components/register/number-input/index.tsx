import { StyleSheet, Modal, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import { Block, Button, FEIcon, Text } from "../../../helper";
import useOrientation from "../../../hooks/useOrientation";
import { $primary } from "../../../helper/theme";
import { useTranslation } from "react-i18next";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export default function NumberInput(props) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { windowWidth } = useOrientation();
  const { open, setPhoneNumber, state, setState, validate, checkCode } = props;
  const [hover, setHover] = useState<any>();

  const dataNumber = [
    {
      data: [
        {
          type: "number",
          text: "1",
        },
        {
          type: "number",
          text: "2",
        },
        {
          type: "number",
          text: "3",
        },
      ],
    },

    {
      data: [
        {
          type: "number",
          text: "4",
        },
        {
          type: "number",
          text: "5",
        },
        {
          type: "number",
          text: "6",
        },
      ],
    },
    {
      data: [
        {
          type: "number",
          text: "7",
        },
        {
          type: "number",
          text: "8",
        },
        {
          type: "number",
          text: "9",
        },
      ],
    },
    {
      data: [
        {
          type: "clear",
          text: "C",
        },
        {
          type: "number",
          text: "0",
        },
        {
          type: "del",
          text: "DEL",
        },
      ],
    },
  ];

  const handlePress = (i: any) => {
    if (i.type === "number") {
      let arr = state;
      let arrString = arr.join("");
      let found = arrString.indexOf(" ");
      if (found !== -1) {
        arr[found] = i.text.toString();
        setState(arr);
      } else return;
    } else if (i.type === "del") {
      let arr = state;
      let arrString = arr.join("");
      let found = arrString.indexOf(" ");
      if (found !== -1) {
        arr[found - 1] = " ";
        setState(arr);
      } else {
        arr[5] = " ";
        setState(arr);
      }
    } else if (i.type === "clear") {
      let arr = state;
      arr.fill(" ");
      setState(arr);
    }
    setPhoneNumber(state.join(""));
  };

  return (
    // <Modal animationType="slide" visible={open} transparent={true} style={{ backgroundColor: "red" }}>
    <Block
      flex
      pa={5}
      style={[
        {
          position: "absolute",
          width: "100%",
          height: 390,
          zIndex: 10,
          bottom: 0,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        },
      ]}
    >
      <Button
        center
        middle
        disabled={validate}
        mx={10}
        my={10}
        radius={10}
        onPress={checkCode}
        style={{ backgroundColor: $primary, height: 50 }}
      >
        <Text title color="white">
          {t("SEND")}
        </Text>
      </Button>
      {dataNumber.map((item, index) => {
        return (
          <Block key={index} row wrap>
            {item.data.map((i, index) => (
              <TouchableHighlight
                underlayColor={$primary}
                onShowUnderlay={() => setHover(i.text)}
                onHideUnderlay={() => setHover("")}
                key={index}
                onPress={() => handlePress(i)}
                style={{
                  width: (windowWidth - 10) / 3,
                  height: 80,
                  backgroundColor: "white",
                  borderTopWidth: 1,
                  borderRightWidth: index !== 2 ? 1 : 0,
                  borderTopColor: $primary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {i.type === "del" ? (
                  <FEIcon name="delete" size={24} color={$primary} />
                ) : (
                  <Text size={24} color={hover === i.text ? "white" : $primary}>
                    {i.text}
                  </Text>
                )}
              </TouchableHighlight>
            ))}
          </Block>
        );
      })}
    </Block>
    // </Modal>
  );
}

const styles = StyleSheet.create({});
