import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostProps } from "../../types/post";

const initialState: any = {
  posts: {
    data: [],
    isFetched: false,
  },
  postReaction: {
    postId: "",
    data: [],
  },
  postComment: {
    postId: "",
    data: [],
  },
  actionLoading: false,
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost(state, action: PayloadAction<any>) {
      state.actionLoading = true;
    },
    createPostSuccess(state, action: PayloadAction<any>) {
      state.actionLoading = false;
      state.posts.data.push(action.payload.data);
    },
    fetchPost(state) {
      state.actionLoading = true;
    },
    fetchPostSuccess(state, action: PayloadAction<any>) {
      state.actionLoading = false;
      // console.log("hunhunhun", state.posts.data);
      state.posts.data = action.payload;
      state.posts.isFetched = true;
    },
    hideActionLoading(state) {
      state.actionLoading = false;
    },
  },
});

export const { createPost, createPostSuccess, fetchPost, fetchPostSuccess, hideActionLoading } =
  PostSlice.actions;
export default PostSlice.reducer;
