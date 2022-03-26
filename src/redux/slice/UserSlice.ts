import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginProps, UserState } from "../../types/user";

const initialState: UserState = {
  token: null,
  userInfo: {},
  actionLoading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login(state, action: PayloadAction<LoginProps>) {
      state.actionLoading = true;
    },

    loginSuccess(state, action: PayloadAction<any>) {
      state.actionLoading = false;
      state.token = action.payload.access_token;
    },

    logout() {},

    logoutSuccess(state) {
      state.token = null;
    },

    getUserInfo(state, action: PayloadAction<any>) {
      state.actionLoading = true;
    },
    getUserInfoSuccess(state, action: PayloadAction<any>) {
      state.actionLoading = false;
      state.userInfo = action.payload.data;
    },

    hideActionLoading(state) {
      state.actionLoading = false;
    },
  },
});

export const {
  saveToken,
  login,
  loginSuccess,
  hideActionLoading,
  logout,
  logoutSuccess,
  getUserInfo,
  getUserInfoSuccess,
} = UserSlice.actions;
export default UserSlice.reducer;
