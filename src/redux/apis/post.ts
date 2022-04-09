import request from "../../utils/axiosService";

const URL_CREATE_POST = "/posts";

export function createPostAPI(token: string, data: any) {
  return request({
    url: URL_CREATE_POST,
    method: "post",
    token,
    data,
  });
}
