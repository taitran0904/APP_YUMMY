import React, { useState } from "react";
import { Image as ImageBase, ActivityIndicator } from "react-native";
import Block from "./Block";
import { $gray } from "./theme";

interface Props {
  source?: any;
  style?: any;
  checkEmpty?: any;
  pure?: boolean;
  emptyImage?: string;
}

const Image: React.FC<Props> = props => {
  const { source, style, checkEmpty, pure, emptyImage } = props;
  const [loading, setLoading] = useState<boolean | string>("nothing");

  if (pure) {
    return <ImageBase {...props} source={source} />;
  }

  return (
    <Block row center middle style={style}>
      {checkEmpty && checkEmpty !== "no-photo" ? (
        <>
          <ImageBase
            style={[{ backgroundColor: "#f4f4f4" }, style]}
            source={source}
            onLoadEnd={() => setLoading(false)}
            onLoadStart={() => setLoading(true)}
            onError={() => setLoading(false)}
          />

          {loading && (
            <Block
              style={[
                style,
                {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "#f4f4f4",
                },
              ]}
              middle
              center
            >
              <ActivityIndicator size="small" color={$gray} />
            </Block>
          )}
        </>
      ) : (
        <ImageBase style={style} source={emptyImage || require("../assets/images/no-avatar.png")} />
      )}
    </Block>
  );
};

export default Image;
