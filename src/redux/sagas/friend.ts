import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { getFriendListAPI } from "../apis/friend";
import { RootState } from "../configureStore";
import { getFriendRequest, getFriendRequestSuccess, hideActionLoading } from "../slice/FriendSlice";

function* getFriendRequestSaga() {
  const token: string = yield select((state: RootState) => state.user.token);
  try {
    const res: AxiosResponse = yield call(getFriendListAPI, token);
    yield put(getFriendRequestSuccess(res.data));
  } catch (error) {
    //
  } finally {
    yield put(hideActionLoading());
  }
}

export default function* friendWatcher() {
  yield takeEvery(getFriendRequest.type, getFriendRequestSaga);
}
