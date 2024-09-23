import { FormBookingCustomer } from "../../types/form"
import { FormBookingAction, formBookingType } from "../constants/formBookingType"

const initState : FormBookingCustomer = {
    user_id: 9,
    checkin_at: '',
    checkout_at: '',
    adult_capacity: 1,
    kid_capacity: 1,
    type_room_id: 0,
    total_price: 0
}

export function formBookingReducer<T extends keyof FormBookingCustomer>( 
    state : FormBookingCustomer = initState, 
    action : FormBookingAction<T> = { type: "SHOW_FORM_BOOKING", payload: null }
) : FormBookingCustomer {
    switch (action.type) {
        case formBookingType.UPDATE:
            return {
                ...state,
                ...(action?.payload || {})
            }
        default:
            return state
    }
}