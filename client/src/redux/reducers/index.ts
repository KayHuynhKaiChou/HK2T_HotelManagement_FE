import { combineReducers } from "redux";
import { userReducer } from "./user";
import { responseReducer } from "./response";
import { amenityReducer } from "./amenity";
import { typeRoomReducer } from "./typeRoom";
import { formBookingReducer } from "./formBooking";

export const rootReducer = combineReducers({
  response : responseReducer,
  user : userReducer,
  amenities : amenityReducer,
  typeRooms : typeRoomReducer,
  formBooking : formBookingReducer
});

export interface RootState {
  user : ReturnType<typeof userReducer>
  response : ReturnType<typeof responseReducer>
  amenities : ReturnType<typeof amenityReducer>
  typeRooms : ReturnType<typeof typeRoomReducer>
  formBooking : ReturnType<typeof formBookingReducer>
}