import request from "../../utils/axiosService";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoginProps } from "../../types/user";

const URL_LOGIN = "/auth/login";
const URL_FETCH_USER_INFO = "/auth/info";
const URL_UPDATE_USER_INFO = "/auth/info/update";

export function loginAPI(data: LoginProps) {
  return request({
    url: URL_LOGIN,
    method: "post",
    data,
  });
}

export function fetchUserInfoAPI(token: string) {
  return request({
    url: URL_FETCH_USER_INFO,
    method: "get",
    token,
  });
}

export function updateUserInfoAPI(token: string, data: any, isFormData: boolean) {
  return request({
    url: URL_UPDATE_USER_INFO,
    method: "put",
    token,
    data,
    isFormData,
  });
}
