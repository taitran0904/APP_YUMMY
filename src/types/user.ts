import { FetchLoadingState } from "./general";

export interface UserState extends FetchLoadingState {
  readonly token: string | null;
}
