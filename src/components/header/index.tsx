import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Block } from "../../helper";

interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  leftStyle?: StyleProp<ViewStyle>;
  centerStyle?: StyleProp<ViewStyle>;
  rightStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}
const Header: React.FC<Props> = props => {
  const { left, center, right, leftStyle, centerStyle, rightStyle, style } = props;
  return (
    <Block row middle space="between" px={20} style={[style, { zIndex: 10 }]}>
      <Block style={[styles.container, leftStyle]}>{left && left}</Block>
      <Block style={[styles.container, centerStyle]}>{center && center}</Block>
      <Block style={[styles.container, rightStyle]}>{right && right}</Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default Header;
// transparent
