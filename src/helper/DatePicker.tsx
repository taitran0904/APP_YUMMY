import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Block from "./Block";
import Text from "./Text";
import Button from "./Button";
import useOrientation from "../hooks/useOrientation";
import { AntIcon } from ".";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  setOpen: any;
};
const DatePicker: React.FC<Props> = ({ open, setOpen }) => {
  const { windowWidth, windowHeight } = useOrientation();
  const { t } = useTranslation();
  const [currentDate, setCurrenDate] = useState(dayjs());

  const checkNameFirstDayOfWeek = name => {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return week.findIndex(item => item === name);
  };

  const getDayOfMonth = () => {
    let days = [];
    const year = dayjs(currentDate).format("YYYY");
    const month = dayjs(currentDate).format("MM");
    const nameFirstDay = dayjs(`${year}-${month}-01`).format("ddd");
    const dayInMonth = dayjs(currentDate).daysInMonth();
    for (let i = 1; i <= dayInMonth + 1; i++) {
      let m: any = dayjs(currentDate).month();
      m = m > 9 ? m : `0${m}`;
      const d = i > 9 ? i : `0${i}`;
      days.push(`${year}-${m}-${d}`);
    }
    if (nameFirstDay === "Sun") return days;
    else {
      for (let i = 1; i <= checkNameFirstDayOfWeek(nameFirstDay); i++) {
        days.unshift(`none${i}`);
      }
      return days;
    }
  };
  console.log(getDayOfMonth());

  const _renderItem = (item: any) => {
    return item.slice(0, 4) === "none" ? (
      <Button>
        <Text>{dayjs(item).date()}</Text>
      </Button>
    ) : (
      <Block />
    );
  };

  const _renderWeekDay = () => {
    const week = [t("SUN"), t("MON"), t("TUE"), t("WED"), t("THU"), t("FRI"), t("SAT")];
    return week.map(item => (
      <Block flex row middle center key={item}>
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
          <Button center middle style={{ width: 50, height: 50 }}>
            <AntIcon name="left" size={20} color="black" />
          </Button>
          <Text title>asdadad</Text>
          <Button center middle style={{ width: 50, height: 50 }}>
            <AntIcon name="right" size={20} color="black" />
          </Button>
        </Block>
        <Block pt={20} style={{ flex: 1 }}>
          <Block row style={{ height: 30 }}>
            {_renderWeekDay()}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({});

export default DatePicker;
