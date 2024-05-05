import { combineReducers } from "redux";
import { userReducer } from "./user";
import { responseReducer } from "./response";

export const rootReducer = combineReducers({
  user : userReducer,
  response : responseReducer
});

export interface RootState {
  user : ReturnType<typeof userReducer>
  response : ReturnType<typeof responseReducer>
}