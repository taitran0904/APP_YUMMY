import React from "react";
import { useTranslation } from "react-i18next";
import { AntIcon, Block, Button, MaIcon, Text } from "../../../helper";
import Image from "../../../helper/Image";
import { $primary } from "../../../helper/theme";
const Information: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Block>
      <Image pure source={require("../../../assets/images/bg.jpg")} style={{ height: 150 }} />
      <Block>
        <Button>
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
        </Button>
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
        <Button
          ma={20}
          px={15}
          py={5}
          radius={5}
          style={{ position: "absolute", right: 0, backgroundColor: $primary }}
        >
          <Text title size={14} color="white">
            {t("FOLLOW")}
          </Text>
        </Button>
      </Block>
    </Block>
  );
};
export default Information;
