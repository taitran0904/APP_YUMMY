import React, { useRef, useState } from "react";
import { Animated } from "react-native";
import { Block } from "../../helper";
import Image from "../../helper/Image";

export default function SplashScreen() {
  const LogoAnim = useRef(new Animated.Value(0)).current;
  // const [loadingSnipper, setLoadingSnipper] = useState(false)
  const LogoOut = () => {
    Animated.parallel([
      Animated.spring(LogoAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 5000,
        useNativeDriver: false,
      }).start(),
    ]);
  };

  // setTimeout(() => {
  //   navigation.navigate('');
  // }, 3000);
  return (
    <Block
      flex
      center
      middle
      style={{
        backgroundColor: "#F24E6A",
      }}
    >
      {LogoOut()}
      <Animated.View
        style={{
          opacity: LogoAnim,
          top: LogoAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [80, 0],
          }),
        }}
      >
        <Image
          pure
          style={{ width: 308, height: 139 }}
          source={require("../../assets/images/Yummy_app_white.png")}
        />
      </Animated.View>
    </Block>
  );
}
