import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  friendRequestList: [],
  actionLoading: false,
};

const FriendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    getFriendRequest(state) {
      state.actionLoading = true;
    },

    getFriendRequestSuccess(state, action: PayloadAction<any>) {
      state.actionLoading = false;
      state.friendRequestList = action.payload.data;
    },

    hideActionLoading(state) {
      state.actionLoading = false;
    },
  },
});

export const { getFriendRequest, getFriendRequestSuccess, hideActionLoading } = FriendSlice.actions;
export default FriendSlice.reducer;
