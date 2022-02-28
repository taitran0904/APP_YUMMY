import React from "react";
import Header from "../../components/header";
import { AntIcon, Block } from "../../helper";
function HomeScreen() {
  return (
    <Block>
      <Header
        left={<AntIcon name="user" size={24} color="black" />}
        // center={<AntIcon name="user" size={24} color="black" />}
        // right={<AntIcon name="user" size={24} color="black" />}
      />
    </Block>
  );
}

export default HomeScreen;
