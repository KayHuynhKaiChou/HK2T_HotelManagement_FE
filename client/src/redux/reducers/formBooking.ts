import { FormBookingCustomer } from "../../types/form"
import { FormBookingAction, formBookingType } from "../constants/formBookingType"

const initState : FormBookingCustomer = {
    user_id: 0,
    checkin_at: '',
    checkout_at: '',
    adult_capacity: 0,
    kid_capacity: 0,
    type_room_id: 0,
    total_price: 0
}

export function typeRoomReducer( 
    state : FormBookingCustomer = initState, 
    action : FormBookingAction = { type: "SHOW_FORM_BOOKING", payload: null }
) : FormBookingCustomer {
    switch (action.type) {
        case formBookingType.UPDATE:
            return {
                ...(action?.payload || initState)
            }
        default:
            return state
    }
}