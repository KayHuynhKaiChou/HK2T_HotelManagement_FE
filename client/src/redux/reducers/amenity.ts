import { Amenity } from "../../types/models"
import { AmenityAction, amenityType } from "../constants/amenityType"

const initState : Amenity[] = [];

export function amenityReducer( 
    state : Amenity[] = initState, 
    action : AmenityAction = { type: "SHOW_AMENITY", payload: null }
) : Amenity[] {
    switch (action.type) {
        case amenityType.SHOW:
            return action?.payload!
        default:
            return state
    }
}