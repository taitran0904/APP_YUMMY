import { View, StyleSheet, Animated } from "react-native";
import { $primary, $secondary } from "./theme";
import React from "react";

interface Props {
  flex?: boolean;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  space?: string;
  wrap?: boolean;
  style?: any;
  pa?: number;
  px?: number;
  py?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  ma?: number;
  mx?: number;
  my?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  animated?: boolean;
  shadow?: boolean;
  primary?: boolean;
  secondary?: boolean;
  children?: any;
  ba?: {
    width: number;
    color: string;
    style?: string;
  };
  bb?: {
    width: number;
    color: string;
    style?: string;
  };
  bt?: {
    width: number;
    color: string;
    style?: string;
  };
  br?: {
    width: number;
    color: string;
    style?: string;
  };
  bl?: {
    width: number;
    color: string;
    style?: string;
  };
  radius?: number;
}

const Block: React.FC<Props> = props => {
  const {
    children,
    animated,
    shadow,
    flex,
    row,
    center,
    middle,
    left,
    right,
    top,
    bottom,
    space,
    wrap,
    style,
    pa,
    px,
    py,
    pl,
    pr,
    pt,
    pb,
    ma,
    mx,
    my,
    ml,
    mr,
    mt,
    mb,
    primary,
    secondary,
    ba,
    bb,
    bt,
    br,
    bl,
    radius,
  } = props;

  const blockStyles: any = [
    flex && { flex: 1 },
    row && styles.row,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    shadow && styles.shadow,
    space && { justifyContent: `space-${space}` },
    wrap && { flexWrap: "wrap" },
    pa && { padding: pa },
    px && { paddingHorizontal: px },
    py && { paddingVertical: py },
    pl && { paddingLeft: pl },
    pr && { paddingRight: pr },
    pt && { paddingTop: pt },
    pb && { paddingBottom: pb },
    ma && { margin: ma },
    mx && { marginHorizontal: mx },
    my && { marginVertical: my },
    ml && { marginLeft: ml },
    mr && { marginRight: mr },
    mt && { marginTop: mt },
    mb && { marginBottom: mb },
    primary && styles.primary,
    secondary && styles.secondary,
    ba && {
      borderWidth: ba.width,
      borderColor: ba.color,
      borderStyle: ba.style,
    },
    bb && {
      borderBottomWidth: bb.width,
      borderBottomColor: bb.color,
      borderBottomStyle: bb.style,
    },
    bt && {
      borderTopWidth: bt.width,
      borderTopColor: bt.color,
      borderTopStyle: bt.style,
    },
    bl && {
      borderLeftWidth: bl.width,
      borderLeftColor: bl.color,
      borderLeftStyle: bl.style,
    },
    br && {
      borderRightWidth: br.width,
      borderRightColor: br.color,
      borderRightStyle: br.style,
    },
    radius && { borderRadius: radius },
    style,
  ];

  if (animated) {
    return (
      <Animated.View {...props} style={blockStyles}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View {...props} style={[{ zIndex: 0 }, blockStyles]}>
      {children}
    </View>
  );
};

export default Block;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  middle: {
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
  },
  left: {
    justifyContent: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
  },
  top: {
    justifyContent: "flex-start",
  },
  bottom: {
    justifyContent: "flex-end",
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0, .4)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.41,
    elevation: 3,
    backgroundColor: "white",
  },
  primary: { backgroundColor: $primary },
  secondary: { backgroundColor: $secondary },
});
