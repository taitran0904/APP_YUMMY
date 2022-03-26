import request from "../../utils/axiosService";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoginProps } from "../../types/user";

const URL_LOGIN = "/auth/login";
const URL_USER_INFO = "/auth/info";

export function loginAPI(data: LoginProps) {
  return request({
    url: URL_LOGIN,
    method: "post",
    data,
  });
}

export function fetchUserInfo(token: string) {
  return request({
    url: URL_USER_INFO,
    method: "get",
    token,
  });
}
