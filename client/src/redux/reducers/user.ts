import { User } from "../../types/models"
import { UserAction, userType } from "../constants/userType"

const initState : User = {
    firstname : '',
    surname : '',
    email : ''
}
export function userReducer( 
    state : User = initState, 
    action : UserAction = { type: "UPDATE_USER", payload: null }
) : User {
    switch (action.type) {
        case userType.SIGN_IN:
            return action?.payload!
        case userType.SHOW:
            return action?.payload!
        case userType.UPDATE:
            return action?.payload!
        case userType.RESET:
            return initState
        default:
            return state
    }
}