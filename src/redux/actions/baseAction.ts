import { Actions } from "./types";

export interface BaseAction {
  type: Actions;
  payload?: any;
}
