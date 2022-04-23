import request from "../../utils/axiosService";

const URL_FRIEND = "/friend-request";

export function getFriendListAPI(token: string) {
  return request({
    url: URL_FRIEND,
    method: "get",
    token,
  });
}

export function checkSendedInvitationAPI(token: string, receiverId: any) {
  return request({
    url: `${URL_FRIEND}/check/${receiverId}`,
    method: "get",
    token,
  });
}

export function sendInvitationsAPI(token: string, receiverId: any) {
  return request({
    url: `${URL_FRIEND}/${receiverId}`,
    method: "post",
    token,
  });
}

export function accecptFriendAPI(token: string, senderId: any) {
  return request({
    url: `${URL_FRIEND}/accept/${senderId}`,
    method: "put",
    token,
  });
}
