import { User } from "../../types/models"
import { UserAction, userType } from "../constants/userType"

const initState : User = {
    firstname : '',
    surname : '',
    position : 4,
    link_avatar : '',
    email : '',
    token : ''
}
export function userReducer( 
    state : User = initState, 
    action : UserAction = { type: "UPDATE_USER", payload: null }
) : User {
    switch (action.type) {
        case userType.SIGN_IN: 
        case userType.SIGN_UP:            
        case userType.SHOW:            
        case userType.UPDATE:
            return action?.payload!
        case userType.RESET:
            return initState
        default:
            return state
    }
}