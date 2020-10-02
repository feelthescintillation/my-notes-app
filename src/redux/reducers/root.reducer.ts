import { NoteApplicationState } from "./../../types/state/noteApplicationState";
import { appReducer } from "./app.reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers<NoteApplicationState>({
  app: appReducer,
});
