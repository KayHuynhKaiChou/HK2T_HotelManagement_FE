import { ResponseFormat } from "../../types/response"
import { ResponseAction, responseType } from "../constants/responseType"

const initState : ResponseFormat = {
    isLoading: false,
    message: '',
    status: 0
}
export function responseReducer( 
    state : ResponseFormat = initState, 
    action : ResponseAction = { type: "START", payload: null }
) : ResponseFormat {
    switch (action.type) {
        case responseType.START:
            return {
                ...initState,
                isLoading: true
            }
        case responseType.SUCCESS:
            return {
                ...initState,
                status : action.payload?.status!,
                message : action.payload?.message!
            }
        case responseType.FAILURE:
            return {
                ...initState,
                status : action.payload?.status!,
                message : action.payload?.message!
            }
        default:
            return state
    }
}