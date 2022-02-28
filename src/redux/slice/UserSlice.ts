import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/user";

const initialState: UserState = {
  token: null,
  actionLoading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { saveToken } = UserSlice.actions;
export default UserSlice.reducer;
