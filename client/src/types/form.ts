import { User } from "./models";
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

export interface FormUserEmployee extends CustomUser {
    city : OptionSelect;
    district : OptionSelect;
    ward : OptionSelect;
}

export interface FormPassword {
    oldPassword : string;
    newPassword : string;
    confirmPassword : string;
}