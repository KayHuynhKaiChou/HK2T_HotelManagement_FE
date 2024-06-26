import { Action } from "redux";
import { User } from "../../types/models";

type keyUserType = 'SIGN_IN' | 'SIGN_UP' | 'SHOW' | 'UPDATE' | 'RESET'
type valueUserType = 'SIGN_IN_USER' | 'SIGN_UP_USER' | 'SHOW_USER' | 'UPDATE_USER' | 'RESET_USER'

export const userType : Record<keyUserType , valueUserType> = {
    SIGN_IN : 'SIGN_IN_USER',
    SIGN_UP : 'SIGN_UP_USER',
    SHOW : 'SHOW_USER',
    UPDATE : 'UPDATE_USER',
    RESET : 'RESET_USER'
} as const

export interface UserAction extends Action<valueUserType>{
    payload : User | null;
}