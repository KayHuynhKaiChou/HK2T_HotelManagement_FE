import { ThunkAction  } from "redux-thunk";
import GateWay from "../../lib/api_gateway"
import { Amenity } from "../../types/models"
import { ResponseAction, responseType } from "../constants/responseType"
import { Action } from 'redux';
import { RootState } from "../reducers";
import { AmenityAction, amenityType } from "../constants/amenityType";
import { refetchList } from "../helper";

export type amenityThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<AmenityAction['type'] | ResponseAction['type']>>;

const showAllAmenity = () : amenityThunkAction => {
    return async (dispatch , getState) => {
        const {user} = getState();
        dispatch({ type : responseType.START })
        const gateway = new GateWay('public' , user.token);
        const response = await gateway.get({action : 'show-ame'});
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
            dispatch({
                type : amenityType.SHOW,
                payload : response.result
            })
        }else{
            dispatch({
                type : responseType.FAILURE,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
        }
    }
}

const createNewAmenity = (amenity : Amenity) : amenityThunkAction => {
    return async (dispatch , getState) => {
        const {user, amenities} = getState();
        dispatch({ type : responseType.START })
        const gateway = new GateWay('admin' , user.token);
        const response = await gateway.post({action : 'create-ame'} , amenity);
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
            dispatch({
                type : amenityType.CREATE,
                payload : refetchList(
                    [...amenities],
                    'CREATE',
                    amenity
                )
            })
        }else{
            dispatch({
                type : responseType.FAILURE,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
        }
    }
}

export const amenityAction = {
    showAllAmenity,
    createNewAmenity
}