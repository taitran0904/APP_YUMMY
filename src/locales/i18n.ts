import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enGeneral from "./en/general.json";
import vnGeneral from "./vn/general.json";

const resources = {
  en: enGeneral,
  vn: vnGeneral,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "vn",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
