import request from "../../utils/axiosService";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoginProps } from "../../types/user";

const URL_LOGIN = "/auth/login";
const URL_FETCH_USER_INFO = "/auth/info";
const URL_UPDATE_USER_INFO = "/auth/info/update";
const URL_CHECK_ACTIVE_CODE = "/auth/check-active-code";
const URL_REGISTER = "/auth/register";
const URL_ADD_INFO = "/auth/add-info";
const URL_DELETE = "/auth/delete";

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

export function register(data: any) {
  return request({
    url: URL_REGISTER,
    method: "post",
    data,
  });
}

export function checkActiveCodeAPI(data: any) {
  return request({
    url: URL_CHECK_ACTIVE_CODE,
    method: "post",
    data,
  });
}

export function addInfoAPI(data: any) {
  return request({
    url: URL_ADD_INFO,
    method: "put",
    data,
  });
}

export function deleteUserAPI(data: any) {
  return request({
    url: URL_DELETE,
    method: "delete",
    data,
  });
}
