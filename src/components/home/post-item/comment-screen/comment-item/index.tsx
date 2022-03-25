import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Block, Text } from "../../../../../helper";
import Image from "../../../../../helper/Image";
import { $gray, $gray3 } from "../../../../../helper/theme";
import useOrientation from "../../../../../hooks/useOrientation";

const CommentItem: React.FC = () => {
  const { windowWidth } = useOrientation();
  dayjs.extend(relativeTime);
  return (
    <Block row middle mx={20} mb={20}>
      <Block style={{ height: "100%" }}>
        <Image style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
      </Block>
      <Block>
        <Text title color="black">
          Tai dep trai
        </Text>
        <Text color="black" numberOfLines={5} style={{ width: windowWidth - 90 }}>
          hihihihihihihihihihhhiihsidhaihsdiashdiashdhasdhasidasihdashidiasi
        </Text>
        <Text color={$gray}>{dayjs("2022-03-22").toNow()}</Text>
      </Block>
    </Block>
  );
};
export default CommentItem;
