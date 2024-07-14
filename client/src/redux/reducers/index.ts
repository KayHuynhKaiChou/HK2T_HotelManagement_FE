import { combineReducers } from "redux";
import { userReducer } from "./user";
import { responseReducer } from "./response";
import { amenityReducer } from "./amenity";
import { typeRoomReducer } from "./typeRoom";

export const rootReducer = combineReducers({
  response : responseReducer,
  user : userReducer,
  amenities : amenityReducer,
  typeRooms : typeRoomReducer
});

export interface RootState {
  user : ReturnType<typeof userReducer>
  response : ReturnType<typeof responseReducer>
  amenities : ReturnType<typeof amenityReducer>
  typeRooms : ReturnType<typeof typeRoomReducer>
}