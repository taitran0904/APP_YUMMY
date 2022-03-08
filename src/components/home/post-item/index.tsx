import { StyleSheet } from "react-native";
import React from "react";
import { Block, Text } from "../../../helper";
import { $primary, $primary2 } from "../../../helper/theme";

export const PostItem: React.FC = () => {
  const _renderInfor = () => {
    return (
      <Block row middle style={{ margin: 10 }}>
        <Block
          style={{
            height: 40,
            width: 40,
            borderRadius: 30,
            backgroundColor: "#f3f3f3",
            marginRight: 10,
            borderWidth: 2,
            borderColor: $primary2,
          }}
        />
        <Text size={14} color="black" title>
          Tai Tran
        </Text>
      </Block>
    );
  };
  return (
    <Block>
      {_renderInfor()}
      <Block style={{ width: "100%", height: 320, backgroundColor: "blue" }} />
      <Text size={14} color="black" numberOfLines={3}>
        - Mì quảng 800 gr - Gà 1 con(khoảng 1.5kg) - Trứng cút 15 quả - Nước dừa 500 ml - Đậu phộng rang 50 gr
        - Bánh tráng mè nướng 4 cái - Bột nghệ 1 muỗng canh - Dầu màu điều 1 muỗng canh - Nước dừa tươi 500 ml
        - Hành lá 3 nhánh - Hành tây 1 củ - Củ nén 10 củ (hành tăm hay còn gọi là củ nắng) - Rau ăn kèm 1 ít
        (xà lách/ rau chuối/ rau húng lủi) - Nước mắm 2 muỗng canh - Đường phèn 1 muỗng canh - Hạt nêm 1/2
        muỗng canh - Muối 1 ít
      </Text>
      <Block style={{ width: "100%", height: 320, backgroundColor: "blue" }} />
    </Block>
  );
};

const styles = StyleSheet.create({});
