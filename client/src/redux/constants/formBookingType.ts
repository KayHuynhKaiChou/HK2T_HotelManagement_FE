import { Action } from "redux";
import { FormBookingCustomer } from "../../types/form";

type keyFormBookingType = 'SHOW' | 'CREATE' | 'UPDATE'
type valueFormBookingType = 'SHOW_FORM_BOOKING' | 'CREATE_FORM_BOOKING' | 'UPDATE_FORM_BOOKING'

export const formBookingType : Record<keyFormBookingType , valueFormBookingType> = {
    SHOW : 'SHOW_FORM_BOOKING',
    CREATE : 'CREATE_FORM_BOOKING',
    UPDATE : 'UPDATE_FORM_BOOKING'
} as const

export type TypeOfKey<T extends keyof FormBookingCustomer> = FormBookingCustomer[T]

export interface FormBookingAction<T extends keyof FormBookingCustomer> extends Action<valueFormBookingType> {
    payload : {
        [x: string]: TypeOfKey<T>;
    } | null;
}