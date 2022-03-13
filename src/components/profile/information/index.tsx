import React from "react";
import { AntIcon, Block, MaIcon, Text } from "../../../helper";
import Image from "../../../helper/Image";
const Information: React.FC = () => {
  return (
    <Block>
      <Image pure source={require("../../../assets/images/bg.jpg")} style={{ height: 150 }} />
      <Block>
        <Image
          pure
          source={require("../../../assets/images/Rose.jpg")}
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            marginTop: -40,
            marginLeft: 20,
            borderWidth: 2,
            borderColor: "white",
          }}
        />
        <Text size={20} title center ml={20} style={{ width: 100 }}>
          Tài trần
        </Text>
        <Block ml={15}>
          <Text my={5} color="black">
            Thích những món ăn ngon{" "}
          </Text>
          <Block row mb={5}>
            <AntIcon name="enviromento" size={20} color="black" />
            <Text color="black">Dia chi</Text>
          </Block>
          <Block row mb={5}>
            <AntIcon name="gift" size={20} color="black" />
            <Text color="black">22/2/2222</Text>
          </Block>
          <Block row mb={5}>
            <MaIcon name="work-outline" size={20} color="black" />
            <Text color="black">Đầu bếp</Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
export default Information;
