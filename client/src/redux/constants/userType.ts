import { Action } from "redux";
import { User } from "../../types/models";

type keyUserType = 'UPDATE' | 'RESET'
type valueUserType = 'UPDATE_USER' | 'RESET_USER'

export const userType : Record<keyUserType , valueUserType> = {
    UPDATE : 'UPDATE_USER',
    RESET : 'RESET_USER'
} as const

export interface UserAction extends Action<valueUserType>{
    payload : User | null;
}