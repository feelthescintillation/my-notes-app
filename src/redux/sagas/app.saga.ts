import { put, takeLatest, call } from "redux-saga/effects";
import { UserActionTypes } from "../actions/types";
import * as Services from "../../services/folder.services";

function* getUser() {
  const user = yield call(Services.getUser);
  yield put({
    type: UserActionTypes.USER_RECIEVED,
    payload: user,
  });
}

export function* watchGetUser() {
  yield takeLatest(UserActionTypes.GET_USER, getUser);
}
