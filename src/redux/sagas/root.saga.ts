import { all } from "redux-saga/effects";
import { watchGetUser } from "./app.saga";
import { noteSagas } from "./note.saga";
import { folderSagas } from "./folder.saga";

export function* rootSaga() {
  yield all([watchGetUser(), ...folderSagas(), ...noteSagas()]);
}
