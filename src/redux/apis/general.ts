import request from "../../utils/axiosService";

const URL_SEARCH = "/auth/search/";

export function searchAPI(token: string, params: any) {
  return request({
    url: URL_SEARCH,
    method: "get",
    token,
    params,
  });
}
