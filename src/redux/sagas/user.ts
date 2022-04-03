import AsyncStorage from "@react-native-async-storage/async-storage";
import { call, put, takeLatest, takeEvery, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { LoginProps } from "../../types/user";
import { fetchUserInfoAPI, loginAPI, updateUserInfoAPI } from "../apis/user";
import { RootState } from "../configureStore";
import {
  getUserInfo,
  getUserInfoSuccess,
  hideActionLoading,
  login,
  loginSuccess,
  logout,
  logoutSuccess,
  updateUserInfo,
  updateUserInfoSuccess,
} from "../slice/UserSlice";
import { errorToast, toast } from "../../helper/ToastHelper";
import { Alert } from "react-native";

function* loginFlowSaga(action: PayloadAction<LoginProps>) {
  const { email, password } = action.payload;
  try {
    const res: AxiosResponse = yield call(loginAPI, { email, password });
    const { data } = res;
    if (data.success === true) {
      AsyncStorage.setItem("token", data.access_token);
      yield put(loginSuccess(data));
    }
  } catch (error) {
    Alert.alert("error", `${error}`);
  } finally {
    yield put(hideActionLoading());
  }
}

function* logoutSaga() {
  // const token: string = yield select((state: RootState) => state.user.token);
  try {
    AsyncStorage.removeItem("token");
    yield put(logoutSuccess());
  } catch (error) {
    //
  }
}

function* getUserInfoSaga() {
  const token: string = yield select((state: RootState) => state.user.token);
  // yield put(getUserInfo());
  try {
    const res: AxiosResponse = yield call(fetchUserInfoAPI, token);
    const { data } = res;
    if (data.success) {
      yield put(getUserInfoSuccess(data));
    }
  } catch (error) {
    //
  } finally {
    yield put(hideActionLoading());
  }
}

function* updateUserInfoSaga(action: PayloadAction<any>) {
  const token: string = yield select((state: RootState) => state.user.token);
  try {
    const res: AxiosResponse = yield call(updateUserInfoAPI, token, action.payload, false);
    const { data } = res;
    if (data.success) {
      yield put(updateUserInfoSuccess(data));
    }
  } catch (error) {
    //
  } finally {
    yield put(hideActionLoading());
  }
}

export default function* userWatcher() {
  yield takeLatest(login.type, loginFlowSaga);
  yield takeLatest(logout.type, logoutSaga);
  yield takeEvery(getUserInfo.type, getUserInfoSaga);
  yield takeLatest(updateUserInfo.type, updateUserInfoSaga);
}
