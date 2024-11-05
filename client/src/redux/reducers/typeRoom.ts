import { TypeRoom } from "../../types/models"
import { TypeRoomAction, typeRoomType } from "../constants/typeRoomType"

const initState : TypeRoom[] = [];

export function typeRoomReducer( 
    state : TypeRoom[] = initState, 
    action : TypeRoomAction = { type: "SHOW_TYPEROOM", payload: null }
) : TypeRoom[] {
    switch (action.type) {
        case typeRoomType.SHOW:
        case typeRoomType.CREATE:
        case typeRoomType.UPDATE:
            return [
                ...(action?.payload || [])
            ]
        default:
            return state
    }
}