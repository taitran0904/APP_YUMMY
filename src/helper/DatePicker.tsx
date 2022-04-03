import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Block from "./Block";
import Text from "./Text";
import Button from "./Button";
import useOrientation from "../hooks/useOrientation";
import { AntIcon } from ".";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { $gray, $gray2, $gray3 } from "./theme";

type Props = {
  open: boolean;
  setOpen: any;
  date?: any;
  setDate?: any;
};
const DatePicker: React.FC<Props> = ({ open, setOpen, date, setDate }) => {
  const { windowWidth, windowHeight } = useOrientation();
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [days, setDays] = useState([]);

  // useEffect=(()=> {

  // })

  useEffect(() => {
    const thisDate: any = getDayOfMonth();
    setDays(thisDate);
  }, [currentDate]);

  const checkNameDayOfWeek = (name: any) => {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return week.findIndex(item => item === name);
  };

  const getDayOfMonth = () => {
    let days = [];
    const year = dayjs(currentDate).format("YYYY");
    const month = dayjs(currentDate).format("MM");
    const nameFirstDay = dayjs(`${year}-${month}-01`).format("ddd");
    const dayInMonth = dayjs(currentDate).daysInMonth();
    const nameLastDay = dayjs(`${year}-${month}-${dayInMonth}`).format("ddd");

    for (let i = 1; i < dayInMonth + 1; i++) {
      let m: any = dayjs(currentDate).month() + 1;
      m = m > 9 ? m : `0${m}`;
      const d = i > 9 ? i : `0${i}`;
      days.push(`${year}-${m}-${d}`);
    }

    if (nameFirstDay === "Sun" && nameLastDay === "Sat") return days;
    if (nameFirstDay !== "Sun") {
      for (let i = 1; i <= checkNameDayOfWeek(nameFirstDay); i++) {
        days.unshift(`none${i}`);
      }
    }
    if (nameLastDay !== "Sat") {
      for (let i = 7; i > checkNameDayOfWeek(nameLastDay); i--) {
        days.push(`none${i}`);
      }
    }
    return days;
  };

  const checkFuture = item => {
    if (dayjs() >= dayjs(item)) {
      return false;
    }
    return true;
  };

  const _renderItem = ({ item }) => {
    return item.slice(0, 4) !== "none" ? (
      <Button
        key={item}
        middle
        center
        onPress={() => {
          if (checkFuture(item)) return;
          setDate(dayjs(item).format("DD-MM-YYYY"));
          setOpen(false);
        }}
        style={{ flex: 1, height: 350 / 7, paddingHorizontal: 2 }}
      >
        <Text color={checkFuture(item) ? $gray2 : "black"}>{dayjs(item).format("DD")}</Text>
      </Button>
    ) : (
      <Block style={{ width: 10, height: 350 / 7, flex: 1, paddingHorizontal: 2 }} />
    );
  };

  const _renderWeekDay = () => {
    const week = [t("SUN"), t("MON"), t("TUE"), t("WED"), t("THU"), t("FRI"), t("SAT")];
    return week.map(item => (
      <Block flex row middle center key={item} style={{ backgroundColor: $gray3 }}>
        <Text>{item}</Text>
      </Block>
    ));
  };

  if (!open) return <Block />;
  return (
    <Block
      center
      middle
      px={20}
      style={{
        width: windowWidth,
        height: windowHeight,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <Button
        onPress={() => setOpen(false)}
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: "rgba(0,0,0,.5)",
          zIndex: 1,
          position: "absolute",
        }}
      />
      <Block
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          maxWidth: 400,
          maxHeight: 450,
          zIndex: 2,
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        <Block
          middle
          row
          space="between"
          style={{ borderBottomWidth: 1, borderBottomColor: "#e1e1e1", height: 60 }}
        >
          <Button
            center
            middle
            style={{ width: 50, height: 50 }}
            onPress={() => setCurrentDate(dayjs(currentDate).subtract(1, "month"))}
          >
            <AntIcon name="left" size={20} color="black" />
          </Button>
          <Text title>{dayjs(currentDate).format("DD-MM-YYYY")}</Text>
          <Button
            center
            middle
            style={{ width: 50, height: 50 }}
            onPress={() => setCurrentDate(dayjs(currentDate).add(1, "month"))}
          >
            <AntIcon name="right" size={20} color="black" />
          </Button>
        </Block>
        <Block pt={20} style={{ flex: 1 }}>
          <Block row style={{ height: 30 }}>
            {_renderWeekDay()}
          </Block>
          <FlatList
            style={{ flex: 1 }}
            data={days}
            extraData={days}
            scrollEnabled={false}
            keyExtractor={(item: any) => `${item}-day`}
            numColumns={7}
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            renderItem={_renderItem}
          />
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({});

export default DatePicker;
