import { formBookingType } from "../constants/formBookingType";
import { FormBookingCustomer } from "../../types/form";

// export type amenityThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<AmenityAction['type'] | ResponseAction['type']>>;

// const showAllAmenity = () : amenityThunkAction => {
//     return async (dispatch , getState) => {
//         const {user} = getState();
//         dispatch({ type : responseType.START })
//         const gateway = new GateWay('admin' , user.token);
//         const response = await gateway.get({action : 'show-ame'});
 
//         if (response.status == 200){
//             dispatch({
//                 type : responseType.SUCCESS,
//                 payload : {
//                     status : response.status,
//                     message : response.message
//                 }
//             })
//             dispatch({
//                 type : amenityType.SHOW,
//                 payload : response.result
//             })
//         }else{
//             dispatch({
//                 type : responseType.FAILURE,
//                 payload : {
//                     status : response.status,
//                     message : response.message
//                 }
//             })
//         }
//     }
// }

const updateFormBooking = (formBooking : FormBookingCustomer) => {
    return { 
        type: formBookingType.UPDATE,
        payload: formBooking
    }
}

export const amenityAction = {
    updateFormBooking
}