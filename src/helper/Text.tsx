import React from "react";
import { Platform, StyleSheet, Text as TextBase } from "react-native";
import { $gray, $primary, $secondary } from "./theme";

export interface Props {
  flex?: boolean;
  center?: boolean;
  left?: boolean;
  right?: boolean;
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
  primary?: boolean;
  secondary?: boolean;
  title?: boolean;
  size?: number;
  weight?: string | number;
  height?: number;
  color?: string;
  numberOfLines?: number;
  italic?: boolean;
}

const Text: React.FC<Props> = props => {
  const {
    children,
    flex,
    center,
    left,
    right,
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
    title,
    size,
    weight,
    height,
    color,
    italic,
  } = props;

  const textStyles: any = [
    { color: $gray },
    !size && { lineHeight: 20 },
    flex && { flex: 1 },
    title && styles.title,
    center && styles.center,
    left && styles.left,
    right && styles.right,
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
    color && styles[color],
    color && !styles[color] && { color },
    height && { lineHeight: height },
    weight && {
      fontWeight: weight === "bold" && Platform.OS === "ios" ? "500" : weight,
    },
    size && { fontSize: size },
    italic && { fontStyle: "italic" },
    style,
  ];

  return (
    <TextBase {...props} style={textStyles}>
      {children}
    </TextBase>
  );
};

export default Text;

const styles: any = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    textAlign: "center",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },

  primary: { color: $primary },
  secondary: { color: $secondary },
});
