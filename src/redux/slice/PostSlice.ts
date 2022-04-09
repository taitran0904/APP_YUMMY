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
    hideActionLoading(state) {
      state.actionLoading = false;
    },
  },
});

export const { createPost, createPostSuccess, hideActionLoading } = PostSlice.actions;
export default PostSlice.reducer;
