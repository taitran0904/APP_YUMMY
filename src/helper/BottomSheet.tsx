import React, { useCallback, useImperativeHandle } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import useOrientation from "../hooks/useOrientation";

type BottomSheetProps = {
  children?: React.ReactNode;
};

type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const { windowHeight } = useOrientation();
const BottomSheet = React.forwardRef<BottomSheetProps, BottomSheetRefProps>(({ children }, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination: number) => {
    "worklet";
    active.value = destination !== 0;
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -windowHeight + 50);
    })
    .onEnd(() => {
      if (translateY.value > -windowHeight / 3) {
        scrollTo(0);
      } else if (translateY.value < -windowHeight / 1.5) {
        scrollTo(-windowHeight + 50);
      }
    });

  const rootBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [-windowHeight + 100, -windowHeight + 50],
      [25, 5],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rootBottomSheetStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: windowHeight,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: windowHeight,
    borderRadius: 25,
  },
});

export default BottomSheet;
