import request from "../../utils/axiosService";

const URL_SEARCH = "/auth/search/";
const URL_SEARCH_QR = "/auth/searchQR";

export function searchAPI(token: string, params: any) {
  return request({
    url: URL_SEARCH,
    method: "get",
    token,
    params,
  });
}

export function searchQRAPI(token: string, data: any) {
  return request({
    url: URL_SEARCH_QR,
    method: "get",
    token,
    data,
  });
}
