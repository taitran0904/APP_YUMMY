import request from "../../utils/axiosService";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoginProps } from "../../types/user";

const URL_LOGIN = "/auth/login";

export function loginAPI(data: LoginProps) {
  return request({
    url: URL_LOGIN,
    method: "post",
    data,
  });
}
