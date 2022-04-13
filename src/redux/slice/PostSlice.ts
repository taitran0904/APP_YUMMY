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
      state.posts.data.unshift(action.payload.data);
    },

    fetchPost(state) {
      state.actionLoading = true;
    },

    fetchPostSuccess(state, action: PayloadAction<any>) {
      state.actionLoading = false;
      state.posts.data = action.payload;
      state.posts.isFetched = true;
    },

    fetchPostComment(state, action: PayloadAction<any>) {
      state.actionLoading = true;
      state.postComment.postId = action.payload;
    },

    fetchPostCommentSuccess(state, action: PayloadAction<any>) {
      state.actionLoading = false;
      state.postComment.data = action.payload;
    },

    createCommentPost(state, action: PayloadAction<any>) {
      state.actionLoading = true;
    },

    createCommentPostSuccess(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.actionLoading = false;
      state.postComment.data.unshift(action.payload);
    },

    hideActionLoading(state) {
      state.actionLoading = false;
    },
  },
});

export const {
  createPost,
  createPostSuccess,
  fetchPost,
  fetchPostSuccess,
  hideActionLoading,
  fetchPostComment,
  fetchPostCommentSuccess,
  createCommentPost,
  createCommentPostSuccess,
} = PostSlice.actions;
export default PostSlice.reducer;
