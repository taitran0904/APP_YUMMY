import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { createPostAPI } from "../apis/post";
import { RootState } from "../configureStore";
import { createPost, createPostSuccess, hideActionLoading } from "../slice/PostSlice";

function* createPostSaga(action: PayloadAction<any>) {
  console.log("=======================sss======");
  const token: string = yield select((state: RootState) => state.user.token);
  try {
    const { photos, status, body } = action.payload;
    const formData = new FormData();
    formData.append("photos", photos);
    formData.append("status", status);
    formData.append("public", action.payload.public);
    formData.append("body", body);

    const res: AxiosResponse = yield call(createPostAPI, token, formData);
    console.log("res.data post", res.data);
    const { data } = res;
    if (data.success) {
      yield put(createPostSuccess(data));
    }
  } catch (error) {
    //
  } finally {
    yield put(hideActionLoading());
  }
}
export default function* postWatcher() {
  yield takeLatest(createPost.type, createPostSaga);
}
