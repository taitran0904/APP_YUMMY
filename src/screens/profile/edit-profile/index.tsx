import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import Header from "../../../components/header";
import { AntIcon, Block, Button, DatePicker, Input, Loading, MaIcon, Modal, Text } from "../../../helper";
import { $gray, $gray3, $primary } from "../../../helper/theme";
import useOrientation from "../../../hooks/useOrientation";
import { updateUserInfo } from "../../../redux/slice/UserSlice";
import { useAppDispatch, useSelector } from "../../../hooks";
import dayjs from "dayjs";

const EditProfileScreen: React.FC = ({ route }) => {
  const { userInfo } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { windowWidth } = useOrientation();

  const loading = useSelector(state => state.user.actionLoading);

  const [infor, setInfor] = useState<any>(userInfo);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<string>(userInfo?.birthday);

  const inputArr = [
    {
      placeholder: "Name",
      value: infor.name,
      onChangeText: (value: any) => {
        setInfor({ ...infor, name: value });
      },
    },
    {
      placeholder: "Date of birth",
      value: infor.birthday,
    },
    {
      placeholder: "Description",
      value: infor.description,
      onChangeText: (value: any) => {
        setInfor({ ...infor, description: value });
      },
    },
    {
      placeholder: "Occupation",
      value: infor.occupation,
      onChangeText: (value: any) => {
        setInfor({ ...infor, occupation: value });
      },
    },
    {
      placeholder: "From",
      value: infor.from,
      onChangeText: (value: any) => {
        setInfor({ ...infor, from: value });
      },
    },
  ];

  useEffect(() => {
    if (date) {
      setInfor({ ...infor, birthday: date });
    }
  }, [date]);

  console.log(infor);

  return (
    <>
      <Header
        left={
          <Block row center middle>
            <Button px={10} onPress={() => navigation.goBack()}>
              <MaIcon name="arrow-back" color="black" size={20} />
            </Button>
            <Block>
              <Text color="black">John</Text>
              {userInfo?.friends.length > 0 && (
                <Text>
                  {userInfo?.friends.length} {t("FOLLOWERS")}
                </Text>
              )}
            </Block>
          </Block>
        }
        centerStyle={{
          flex: 0,
        }}
        style={{ height: 50 }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block middle style={{ marginTop: 10 }}>
          {inputArr.map((item: any, index: number) =>
            item.placeholder === "Date of birth" ? (
              <Button
                row
                middle
                key={index}
                style={[
                  styles.input,
                  {
                    width: windowWidth - 40,
                  },
                ]}
                space="between"
                onPress={() => setOpenCalendar(true)}
              >
                <Text color={item.value ? "black" : $gray}>
                  {dayjs(item.value).format("DD-MM-YYYY") || item.placeholder}
                </Text>
                <AntIcon name="calendar" color={$gray} size={28} />
              </Button>
            ) : (
              <Input
                key={index}
                placeholder={item.placeholder}
                value={item.value}
                onChangeText={item?.onChangeText}
                style={[
                  styles.input,
                  {
                    width: windowWidth - 40,
                  },
                ]}
              />
            ),
          )}
          <Button
            row
            center
            middle
            onPress={() => {
              dispatch(
                updateUserInfo({
                  name: infor.name,
                  birthday: infor.birthday,
                  description: infor.description,
                  occupation: infor.occupation,
                  from: infor.from,
                }),
              );
              navigation.goBack();
            }}
            style={[
              styles.input,
              {
                width: windowWidth - 40,
                backgroundColor: $primary,
              },
            ]}
          >
            {loading && <Loading color="white" style={{ marginRight: 5 }} />}
            <Text title color="white">
              {t("SAVE")}
            </Text>
          </Button>
        </Block>
      </ScrollView>
      <DatePicker setOpen={setOpenCalendar} open={openCalendar} date={date} setDate={setDate} />
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: $gray3,
    borderRadius: 10,
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
