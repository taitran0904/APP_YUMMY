import React from "react";
import { ScrollView } from "react-native";
import { AntIcon, Block, Button, FAIcon } from "../../../helper";
import { $gray3, $primary2, $white } from "../../../helper/theme";

export const Stories: React.FC = () => {
  const list = [1, 2, 3, 4, 5];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ margin: 10 }}>
      {list.map((item: any, index: number) => {
        return index === 0 ? (
          <Button
            middle
            key={item}
            style={{
              width: 100,
              height: 160,
              backgroundColor: $white,
              borderRadius: 15,
              margin: 4,
              borderWidth: 1,
              borderColor: $gray3,
              overflow: "hidden",
            }}
          >
            <Block style={{ backgroundColor: "blue", width: "100%", height: "65%" }} />
            <Block
              center
              middle
              style={{
                borderWidth: 3,
                borderColor: $white,
                width: 35,
                height: 35,
                borderRadius: 30,
                marginTop: -18,
                backgroundColor: $primary2,
              }}
            >
              <FAIcon name="plus" size={20} color={$white} />
            </Block>
          </Button>
        ) : (
          <Button
            key={item}
            style={{
              width: 100,
              height: 160,
              backgroundColor: "red",
              borderRadius: 15,
              margin: 4,
              borderWidth: 1,
              borderColor: $gray3,
            }}
          />
        );
      })}
    </ScrollView>
  );
};
