import { Account, User } from "./models";
import { OptionSelect } from "./supportUI";

type CustomUser = Required<
    Omit<
        User , 
        "id" |
        "password" |
        "salary" | 
        "token" | 
        "booked_rooms" | 
        "position" |
        "city" |
        "district" |
        "ward" |
        "status"
    >
>

export interface FormUserProfile extends CustomUser {
    city : OptionSelect;
    district : OptionSelect;
    ward : OptionSelect;
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

export type ActionForm = 'CREATE' | 'UPDATE' 

export interface FormBooking {
    email : OptionSelect;
    checkin_at : string;
    checkout_at : string;
    adult_capacity : number;
    kid_capacity : number;
    type_room : OptionSelect;
    total_price : number;
}

export interface FormBookingCustomer extends Omit<FormBooking, "email" | "type_room"> {
    user_id : number;
    type_room_id : number;
}