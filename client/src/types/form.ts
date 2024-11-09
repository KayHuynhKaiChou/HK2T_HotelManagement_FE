import { Account, Amenity, Room, User } from "./models";
import { OptionSelect } from "./supportUI";

export type ActionForm = 'CREATE' | 'UPDATE'

export type ActionFormBooking = ActionForm | 'BOOKING'

type CustomUser = 
    Omit<
        User ,
        "password" |
        "token" | 
        "booked_rooms" | 
        "position" |
        "city" |
        "district" |
        "ward"
    >

export interface FormUserProfile extends CustomUser {
    city : OptionSelect;
    district : OptionSelect;
    ward : OptionSelect;
    position : OptionSelect;
}

export interface FormPassword {
    oldPassword : string;
    newPassword : string;
    confirmPassword : string;
}

export interface FormSignup extends Account{
    firstname : string;
    surname : string;
    confirmPassword : string;
}

export interface FormAmenityPayload extends Omit<Amenity , 'type'>{
    type : OptionSelect
}

export interface FormRoomPayload extends Omit<Room , 'type_room'> {
    type_room : OptionSelect;
}

export interface FormBooking {
    email : OptionSelect;
    checkin_at : string;
    checkout_at : string;
    adult_number : number;
    kid_number : number;
    type_room : OptionSelect;
    total_price : number;
}

export interface FormBookingCustomer extends Omit<FormBooking, "email" | "type_room"> {
    user_id : number;
    type_room_id : number;
}