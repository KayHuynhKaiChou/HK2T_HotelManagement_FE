import { ThunkAction  } from "redux-thunk";
import GateWay from "../../lib/api_gateway"
import { Account} from "../../types/models"
import { ResponseAction, responseType } from "../constants/responseType"
import { UserAction, userType } from "../constants/userType"
import { Action } from 'redux';
import { RootState } from "../reducers";

export type UserThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<UserAction['type'] | ResponseAction['type']>>;

const updateUser = (formSignin : Account) : UserThunkAction => {
    return async (dispatch) => {
        dispatch({ type : responseType.START })
        const gateway = new GateWay('user');
        const response = await gateway.post({action : 'sign_in'} , formSignin);
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
            dispatch({
                type : userType.UPDATE,
                payload : response.data
            })
        }else{
            dispatch({
                type : responseType.FAILURE,
                payload : {
                    status : response.status,
                    message : response.message,
                    error : response.error
                }
            })
        }
    }
}

export const userAction = {
    updateUser
}