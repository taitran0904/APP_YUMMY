import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { Block, Button, Text } from "../../../helper";
import { $gray, $gray2, $primary } from "../../../helper/theme";
import { useSelector } from "../../../hooks";
import useOrientation from "../../../hooks/useOrientation";
import { PostItem } from "../../home/post-item";
import UserItem from "../../search/user-item";

type Props = {
  user?: any;
};

const TabView: React.FC<Props> = props => {
  const { t } = useTranslation();
  const { windowWidth } = useOrientation();

  const { user } = props;

  const postList = useSelector((state: any) => state.post.posts?.data);

  const [active, setActive] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const tab = [
    {
      id: 1,
      title: t("IMAGES"),
    },
    {
      id: 2,
      title: t("STATUS"),
    },
    {
      id: 3,
      title: t("FOLLOWING"),
    },
  ];

  useEffect(() => {
    if (active === 1) {
      const data = postList.filter((item: any) => item.photos?.length > 0 && item.user._id === user._id);
      setData(data);
    } else if (active === 2) {
      const data = postList.filter((item: any) => item.photos?.length === 0 && item.user._id === user?._id);
      setData(data);
    } else setData(user.friends);
  }, [active, postList, user]);

  return (
    <Block row wrap bb={{ width: 1, color: $gray2 }}>
      {tab.map((item: any) => {
        return (
          <Button
            center
            middle
            py={15}
            key={item.id}
            style={{ width: windowWidth / 3 }}
            onPress={() => setActive(item.id)}
          >
            <Text
              size={16}
              color={active === item.id ? $primary : $gray}
              weight={active === item.id ? "700" : "500"}
            >
              {item.title}
            </Text>
            {active === item.id && (
              <Block
                style={{
                  position: "absolute",
                  zIndex: 100,
                  backgroundColor: $primary,
                  height: 4,
                  width: "100%",
                  bottom: 0,
                  borderRadius: 5,
                }}
              />
            )}
          </Button>
        );
      })}
      {active !== 3 ? (
        data.length > 0 ? (
          data?.map((item: any, index: number) => <PostItem key={index} post={item} />)
        ) : (
          <Block />
        )
      ) : data.length > 0 ? (
        <Block row wrap mx={10}>
          {data?.map((item: any, index: number) => (
            <UserItem key={index} user={item} setSearch={setSearch} />
          ))}
        </Block>
      ) : (
        <Block />
      )}
    </Block>
  );
};

export default TabView;
