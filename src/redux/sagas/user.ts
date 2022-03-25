import AsyncStorage from "@react-native-async-storage/async-storage";
import { call, put, takeLatest, takeEvery, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { LoginProps } from "../../types/user";
import { loginAPI } from "../apis/user";
import { RootState } from "../configureStore";
import { hideActionLoading, login, loginSuccess, logout, logoutSuccess } from "../slice/UserSlice";
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
    } else if (data.success === false) {
      // toast("hihi", "error", 3000);
      console.log("hhihhihhih");
    }
  } catch (error) {
    console.log("error", error);
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

export default function* userWatcher() {
  yield takeLatest(login.type, loginFlowSaga);
  yield takeLatest(logout.type, logoutSaga);
}
