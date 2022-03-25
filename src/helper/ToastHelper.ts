import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export const toast = (text: string, type: string = "success", duration?: number, text2?: string) => {
  let toastType = type;
  if (type === "warning" || type === "info") {
    toastType = "info";
  }
  if (type === "danger" || type === "error") {
    toastType = "error";
  }

  return Toast.show({
    text1: text,
    text2,
    autoHide: true,
    type: toastType,
    visibilityTime: duration || 1000,
  });
};

export const errorToast = (error: any, title: string) => {
  const { t } = useTranslation();
  if (error?.response?.data?.message) {
    console.log(error.response.data.message);
  } else {
    console.log(error);
  }

  if (error.message === "Network Error") {
    toast(t("NETWORK_DISCONNECTED"), "danger", 10000);
  } else {
    toast(title, "danger", 5000);
  }
};
