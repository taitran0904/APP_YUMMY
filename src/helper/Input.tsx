import React from "react";
import { TextInput, StyleSheet, View, KeyboardTypeOptions } from "react-native";

interface Props {
  style?: any;
  multiline?: boolean;
  shadow?: boolean;
  ref?: any;
  value?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoFocus?: boolean;
  maxLength?: number;
  textSize?: number;
  // onChangeText: (e: string) => void;
  // onBlur?: (e?: any) => void;
  // onFocus?: (e?: any) => void;
  // onSubmitEditing?: () => void;
  prefix?: React.ComponentElement<PanRecognizer, any>;
  suffix?: React.ComponentElement<PanRecognizer, any>;
}

export default class Input extends React.Component<Props> {
  render() {
    const {
      style,
      multiline,
      shadow,
      maxLength,
      ref,
      prefix,
      suffix,
      textSize,
      ...props
    } = this.props;
    return (
      <View style={[shadow && styles.shadow, styles.inputContainer, style]}>
        {prefix && prefix}
        <TextInput
          maxLength={maxLength}
          ref={ref}
          textAlignVertical="center"
          multiline={multiline}
          style={{ ...styles.input, fontSize: textSize ? textSize : 14 }}
          {...props}
        />
        {suffix && suffix}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    height: "100%",
  },
  shadow: {
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.41,
    backgroundColor: "white",
    elevation: 3,
  },
});
