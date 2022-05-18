import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { Block, FEIcon, Input, Text, Button, AntIcon } from "../../helper";
import Header from "../../components/header";
import { $gray3, $primary } from "../../helper/theme";
import { useTranslation } from "react-i18next";
import UserItem from "../../components/search/user-item";
import useOrientation from "../../hooks/useOrientation";
import { AxiosResponse } from "axios";
import { searchAPI } from "../../redux/apis/general";
import { useSelector } from "../../hooks";
import Image from "../../helper/Image";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { windowHeight, windowWidth } = useOrientation();

  const token: any = useSelector(state => state.user.token);

  const [search, setSearch] = useState<string>("");
  const [dataSearch, setDataSearch] = useState<any>([]);

  const fetchDataSearch = useCallback(async () => {
    const res: AxiosResponse = await searchAPI(token, { q: search });
    setDataSearch(res.data.data);
  }, [search]);

  useEffect(() => {
    setDataSearch([]);
  }, [search]);

  return (
    <>
      <Block>
        <Header
          leftStyle={{ flex: 0 }}
          rightStyle={{ flex: 0 }}
          center={
            <Input
              value={search}
              placeholder={t("SEARCH")}
              suffix={<FEIcon name="search" color={$primary} size={20} />}
              style={styles.input}
              onChangeText={setSearch}
              onSubmitEditing={fetchDataSearch}
            />
          }
          centerStyle={{ marginHorizontal: 10 }}
          style={styles.header}
        />
        {dataSearch.length > 0 ? (
          <FlatList
            data={dataSearch}
            extraData={dataSearch}
            keyExtractor={(item: any) => `key${item._id}`}
            renderItem={({ item }) => <UserItem user={item} setSearch={setSearch} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginHorizontal: 10 }}
            numColumns={2}
          />
        ) : (
          <Block center middle style={{ height: windowHeight - 110 }}>
            <Image
              pure
              source={require("../../assets/images/empty_search.png")}
              style={{ width: 300, height: 300 }}
            />
          </Block>
        )}
      </Block>
      <Button
        center
        middle
        shadow
        onPress={() => navigation.navigate("QRCodeScannerScreen")}
        style={styles.qrcodeBtn}
      >
        <LottieView
          source={require("../../assets/lottie/qrcode.json")}
          autoPlay
          loop
          style={{ width: 40, height: 40 }}
        />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: $gray3,
    height: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: $gray3,
    borderRadius: 10,
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
  qrcodeBtn: {
    height: 60,
    width: 60,
    backgroundColor: "#e6e6e6",
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 30,
  },
});
