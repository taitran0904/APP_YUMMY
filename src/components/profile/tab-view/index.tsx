import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Block, Button, Text } from "../../../helper";
import { $gray, $gray2, $primary } from "../../../helper/theme";
import useOrientation from "../../../hooks/useOrientation";

const TabView: React.FC = () => {
  const { t } = useTranslation();
  const { windowWidth } = useOrientation();
  const [active, setActive] = useState(1);
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
    </Block>
  );
};

export default TabView;
