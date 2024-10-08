import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { userReducer } from "./user";
import { responseReducer } from "./response";
import { amenityReducer } from "./amenity";
import { typeRoomReducer } from "./typeRoom";
import { formBookingReducer } from "./formBooking";
import { UserAction } from "../constants/userType";
import { FormBookingAction } from "../constants/formBookingType";
import { FormBookingCustomer } from "../../types/form";

// Cấu hình persist
const authPersistConfig = {
  key: 'auth', // Key này sẽ lưu trong storage
  storage,     // Sử dụng localStorage
};

const formBookingPersistConfig = {
  key: 'formBooking', // Key này sẽ lưu trong storage
  storage,     // Sử dụng localStorage
};

export interface RootState {
  user : ReturnType<typeof userReducer>
  response : ReturnType<typeof responseReducer>
  amenities : ReturnType<typeof amenityReducer>
  typeRooms : ReturnType<typeof typeRoomReducer>
  formBooking : ReturnType<typeof formBookingReducer>
}

export const rootReducer = combineReducers({
  response : responseReducer,
  user : persistReducer<RootState['user'], UserAction>(authPersistConfig, userReducer),
  amenities : amenityReducer,
  typeRooms : typeRoomReducer,
  formBooking : persistReducer<RootState['formBooking'], FormBookingAction<keyof FormBookingCustomer>>(formBookingPersistConfig, formBookingReducer)
});