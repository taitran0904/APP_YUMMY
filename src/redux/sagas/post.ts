import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { createPostAPI, fetchPostAPI } from "../apis/post";
import { RootState } from "../configureStore";
import {
  createPost,
  createPostSuccess,
  fetchPost,
  fetchPostSuccess,
  hideActionLoading,
} from "../slice/PostSlice";

function* createPostSaga(action: PayloadAction<any>) {
  const token: string = yield select((state: RootState) => state.user.token);
  try {
    const { photos, status, body } = action.payload;
    const formData = new FormData();
    photos.forEach((photo: any) => formData.append("photos", photo));
    formData.append("status", status.toLowerCase());
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

function* fetchPostSaga() {
  const token: string = yield select((state: RootState) => state.user.token);
  try {
    const res: AxiosResponse = yield call(fetchPostAPI, token);
    const { data } = res;
    if (data.success) {
      yield put(fetchPostSuccess(data.data));
    }
  } catch (error) {
    //
  } finally {
    put(hideActionLoading());
  }
}

export default function* postWatcher() {
  yield takeLatest(createPost.type, createPostSaga);
  yield takeEvery(fetchPost.type, fetchPostSaga);
}
