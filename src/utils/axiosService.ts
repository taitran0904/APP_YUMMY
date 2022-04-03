import axios, { AxiosRequestConfig } from "axios";
import { API_ENDPOINT } from "../constant";

type OptionProps = {
  url: string;
  method: "post" | "get" | "delete" | "put";
  token?: string;
  isFormData?: boolean;
  data?: object;
  params?: any;
};

export default function AxiosService(option: OptionProps) {
  const config: AxiosRequestConfig = {
    url: API_ENDPOINT + option.url,
    method: option.method,
    headers: {
      Authorization: `Bearer ${option.token}`,
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
}
