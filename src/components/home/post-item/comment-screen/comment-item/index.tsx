import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Block, Text } from "../../../../../helper";
import Image from "../../../../../helper/Image";
import { $gray, $gray3 } from "../../../../../helper/theme";
import useOrientation from "../../../../../hooks/useOrientation";
import { IMAGE_BASE_URL } from "../../../../../constant";

type Props = {
  body?: any;
  createdAt?: any;
  user?: any;
};
const CommentItem: React.FC<Props> = ({ body, createdAt, user }) => {
  const { windowWidth } = useOrientation();
  dayjs.extend(relativeTime);
  return (
    <Block row middle mx={20} mb={20}>
      <Block style={{ height: "100%" }}>
        <Image
          checkEmpty={user?.avatar}
          source={{
            uri: `${IMAGE_BASE_URL}/user/avatar/${user?.avatar}`,
          }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </Block>
      <Block ml={10}>
        <Text title color="black">
          {user?.name}
        </Text>
        <Text color="black" numberOfLines={5} style={{ width: windowWidth - 90 }}>
          {body}
        </Text>
        <Text color={$gray}>{dayjs(createdAt).toNow()}</Text>
      </Block>
    </Block>
  );
};
export default CommentItem;
