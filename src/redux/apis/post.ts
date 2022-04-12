import request from "../../utils/axiosService";

const URL_POST = "/posts";

export function createPostAPI(token: string, data: any) {
  return request({
    url: URL_POST,
    method: "post",
    token,
    data,
  });
}

export function fetchPostAPI(token: string) {
  return request({
    url: URL_POST,
    method: "get",
    token,
  });
}

export function fetchPostCommentAPI(token: string, postId: string) {
  return request({
    url: `${URL_POST}/${postId}/comments`,
    method: "get",
    token,
  });
}

export function commentOnPostAPI(token: string, params: any) {
  return request({
    url: `${URL_POST}/${params.postId}/comments`,
    method: "post",
    token,
    data: { body: params.body },
  });
}
