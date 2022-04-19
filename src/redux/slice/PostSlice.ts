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
      state.actionLoading = false;
      state.postComment.data.unshift(action.payload);
    },

    createReaction(state, action: PayloadAction<any>) {
      state.actionLoading = true;
    },

    createReactionSuccess(state, action: PayloadAction<any>) {
      state.actionLoading = false;
      const { data, userInfo } = action.payload;
      const posts = state.posts.data;
      const postIndex = posts.findIndex((post: any) => post._id === data.postId);
      if (postIndex !== -1) {
        const isReacted = posts[postIndex].reaction.findIndex(
          (reaction: { user: { _id: string } }) => `${reaction.user._id}` === `${userInfo._id}`,
        );
        if (isReacted !== -1) {
          if (posts[postIndex].reaction[isReacted].type !== data.type) {
            posts[postIndex].reaction[isReacted].type = data.type;
          } else {
            posts[postIndex].reaction = posts[postIndex].reaction.filter(
              (reaction: { user: { _id: string } }) => `${reaction.user._id}` !== `${userInfo._id}`,
            );
          }
        } else {
          posts[postIndex].reaction.unshift({
            type: data.type,
            user: { _id: userInfo._id, avatar: userInfo.avatar, name: userInfo.name },
          });
        }
      }
      state.posts.data = posts;
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
  createReaction,
  createReactionSuccess,
  createCommentPost,
  createCommentPostSuccess,
} = PostSlice.actions;
export default PostSlice.reducer;
