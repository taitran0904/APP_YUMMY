export type CreatePostProps = {
  public: 0 | 1 | 2;
  status: "none" | "happy" | "sad" | "love" | "angry" | "wow";
  body: string;
  photos?: string[];
  photoFiles: any[];
  icon_source?: NodeRequire | null;
};

export type AddReactionProps = {
  postId: string;
  type: string;
};

export type AddCommentProps = {
  postId: string;
  body: string;
};

export type DeleteCommentProps = {
  postId: string;
  commentId: string;
};

export type UserProps = {
  _id: string;
  name: string;
  avatar: string;
};

export type ReactionProps = {
  user: UserProps;
  type: string;
};

export type CommentProps = {
  body: string;
  reaction: ReactionProps[];
  post: any;
  user: UserProps;
  createdAt: string;
};

export type PostProps = {
  _id: string;
  body: string;
  public: number;
  status: string;
  photos: string[];
  user: UserProps;
  reaction: ReactionProps[];
  comments: string[];
  createdAt: string;
};

export interface PostState {
  readonly posts: { data: PostProps[]; isFetched: boolean };
  readonly postReaction: { postId: string; data: ReactionProps[] };
  readonly postComment: { postId: string; data: CommentProps[] };
  readonly actionLoading: boolean;
}
