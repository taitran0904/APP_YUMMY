import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import {
  commentOnPostAPI,
  createPostAPI,
  createReactionAPI,
  fetchPostAPI,
  fetchPostCommentAPI,
} from "../apis/post";
import { RootState } from "../configureStore";
import {
  createCommentPost,
  createCommentPostSuccess,
  createPost,
  createPostSuccess,
  createReaction,
  createReactionSuccess,
  fetchPost,
  fetchPostComment,
  fetchPostCommentSuccess,
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

function* fetchPostCommentSaga(action: PayloadAction<any>) {
  const token: string = yield select((state: RootState) => state.user.token);
  try {
    const res: AxiosResponse = yield call(fetchPostCommentAPI, token, action.payload);
    const { data } = res;
    if (data.success) {
      yield put(fetchPostCommentSuccess(data.data));
    }
  } catch (error) {
    //
  } finally {
    put(hideActionLoading());
  }
}

function* commentPostSaga(action: PayloadAction<any>) {
  const token: string = yield select((state: RootState) => state.user.token);
  console.log("tai dep trai", action.payload);
  try {
    const res: AxiosResponse = yield call(commentOnPostAPI, token, action.payload);
    const { data } = res;
    if (data.success) {
      yield put(createCommentPostSuccess(data.data));
    }
  } catch (error) {
    //
  } finally {
    put(hideActionLoading());
  }
}

function* createReactionSaga(action: PayloadAction<any>) {
  const token: string = yield select((state: RootState) => state.user.token);
  const userInfo: any = yield select((state: any) => state.user.userInfo);
  try {
    yield put(createReactionSuccess({ data: action.payload, userInfo }));
    yield call(createReactionAPI, token, action.payload);
  } catch (error) {
    //
  }
}

export default function* postWatcher() {
  yield takeLatest(createPost.type, createPostSaga);
  yield takeLatest(createCommentPost.type, commentPostSaga);
  yield takeLatest(createReaction.type, createReactionSaga);
  yield takeEvery(fetchPost.type, fetchPostSaga);
  yield takeEvery(fetchPostComment.type, fetchPostCommentSaga);
}
