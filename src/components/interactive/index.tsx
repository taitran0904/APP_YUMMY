import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef } from "react";
import { AntIcon, Block, Button } from "../../helper";

const Interactive: React.FC = () => {
  const navigation = useNavigation();
  const interactive = [
    {
      id: 1,
      icon: "message1",
      onPress: () => navigation.navigate("CommentScreen"),
    },
    {
      id: 2,
      icon: "hearto",
      active: "heart",
      onPress: () => console.log("hihi"),
    },
  ];

  return (
    <>
      <Block row>
        {interactive.map((item: any) => (
          <Button key={item.id} ml={20} my={10} onPress={item.onPress}>
            <AntIcon name={item.icon} size={24} color="black" />
          </Button>
        ))}
      </Block>
    </>
  );
};

export default Interactive;
