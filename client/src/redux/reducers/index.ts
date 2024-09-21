import { combineReducers, Reducer } from "redux";
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { userReducer } from "./user";
import { responseReducer } from "./response";
import { amenityReducer } from "./amenity";
import { typeRoomReducer } from "./typeRoom";
import { formBookingReducer } from "./formBooking";

// Cấu hình persist
const persistConfig: PersistConfig<RootState> = {
  key: 'rootHotelHk2T', // Key này sẽ lưu trong storage
  storage,     // Sử dụng localStorage
};

export interface RootState {
  user : ReturnType<typeof userReducer>
  response : ReturnType<typeof responseReducer>
  amenities : ReturnType<typeof amenityReducer>
  typeRooms : ReturnType<typeof typeRoomReducer>
  formBooking : ReturnType<typeof formBookingReducer>
}

// @ts-ignore
const rootReducer : Reducer<RootState> = combineReducers({
  response : responseReducer,
  user : userReducer,
  amenities : amenityReducer,
  typeRooms : typeRoomReducer,
  formBooking : formBookingReducer
});

export const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);