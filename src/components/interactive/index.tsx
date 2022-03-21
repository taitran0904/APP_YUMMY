import React, { useCallback, useRef } from "react";
import { AntIcon, Block, Button, Text, BottomSheet } from "../../helper";

type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const Interactive: React.FC = () => {
  const ref = useRef<BottomSheetRefProps>(null);
  const interactive = [
    {
      id: 1,
      icon: "message1",
      onPress: useCallback(() => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
          ref?.current?.scrollTo(0);
        } else {
          ref?.current?.scrollTo(-255);
        }
      }, []),
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
      <BottomSheet ref={ref}>
        <Block>
          <Text>hihi</Text>
        </Block>
      </BottomSheet>
    </>
  );
};

export default Interactive;
