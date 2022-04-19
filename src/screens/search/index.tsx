import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { debounce } from "lodash";

import { Block, FEIcon, Input, Text, Button } from "../../helper";
import Header from "../../components/header";
import { $gray3, $primary } from "../../helper/theme";
import { useTranslation } from "react-i18next";
import UserItem from "../../components/search/user-item";
import useOrientation from "../../hooks/useOrientation";
import BottomSheet from "../../helper/BottomSheet";
import { AxiosResponse } from "axios";
import { searchAPI } from "../../redux/apis/general";
import { useSelector } from "../../hooks";

export default function SearchScreen() {
  const { t } = useTranslation();
  const { windowHeight, windowWidth } = useOrientation();

  const token: any = useSelector(state => state.user.token);

  const [search, setSearch] = useState<string>("");
  const [dataSearch, setDataSearch] = useState<any>([]);

  const fetchDataSearch = useCallback(async () => {
    const res: AxiosResponse = await searchAPI(token, { q: search });
    setDataSearch(res.data.data);
    setSearch("");
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
        <FlatList
          data={dataSearch}
          keyExtractor={(index: number) => index.toString()}
          renderItem={({ item }) => <UserItem user={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Block>
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
});
