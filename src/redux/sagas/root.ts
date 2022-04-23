import { all } from "redux-saga/effects";
import postWatcher from "./post";
import userWatcher from "./user";
import friendWatcher from "./friend";

function* rootSaga() {
  yield all([userWatcher(), postWatcher(), friendWatcher()]);
}

export default rootSaga;
