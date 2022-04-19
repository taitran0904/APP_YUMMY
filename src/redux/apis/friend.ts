import request from "../../utils/axiosService";

const URL_FRIEND = "/friend-request";

export function getFriendListAPI(token: string) {
  return request({
    url: URL_FRIEND,
    method: "get",
    token,
  });
}

export function friendRequestAPi(token: string, params: any) {
  return request({
    url: URL_FRIEND,
    method: "post",
    token,
    params,
  });
}
