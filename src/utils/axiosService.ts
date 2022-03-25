import axios from "axios";
import { API_ENDPOINT } from "../constant";

type OptionProps = {
  url: string;
  method: "post" | "get" | "put" | "delete";
  token?: string;
  isFormData?: boolean;
  data?: object;
  params?: any;
};

const service = (option: OptionProps) => {
  const config: any = {
    url: API_ENDPOINT + option.url,
    method: option.method,
    headers: {
      "x-access-token": option.token,
      "Content-Type": option.isFormData ? "multipart/form-data" : "application/json",
    },
    timeout: 30000,
  };

  if (option.data) {
    config.data = option.data;
  }

  if (option.params) {
    config.params = option.params;
  }

  return axios(config);
};

export default service;
