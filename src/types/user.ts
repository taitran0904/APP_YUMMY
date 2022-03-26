import { FetchLoadingState } from "./general";

export interface UserState extends FetchLoadingState {
  readonly token: string | null;
  readonly userInfo: {};
  readonly actionLoading: boolean;
}

export type LoginProps = {
  email: string;
  password: string;
};
