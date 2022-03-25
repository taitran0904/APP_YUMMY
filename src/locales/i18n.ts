import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enGeneral from "./en/general.json";
import enError from "./en/error.json";
import vnGeneral from "./vn/general.json";
import vnError from "./vn/error.json";

const resources = {
  en: {
    translation: enGeneral,
    enError,
  },
  vn: {
    translation: vnGeneral,
    vnError,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
