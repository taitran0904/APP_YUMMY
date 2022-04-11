import { all } from "redux-saga/effects";
import postWatcher from "./post";
import userWatcher from "./user";

function* rootSaga() {
  yield all([userWatcher(), postWatcher()]);
}

export default rootSaga;
