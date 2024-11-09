import { ThunkAction  } from "redux-thunk";
import GateWay from "../../lib/api_gateway"
import { Account, User } from "../../types/models"
import { ResponseAction, responseType } from "../constants/responseType"
import { UserAction, userType } from "../constants/userType"
import { Action } from 'redux';
import { RootState } from "../reducers";
import { FormPassword, FormSignup } from "../../types/form";

export type UserThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<UserAction['type'] | ResponseAction['type']>>;

const signInUser = (formSignin : Account , resource : string) : UserThunkAction => {
    return async (dispatch) => {
        dispatch({ type : responseType.START })
        const gateway = new GateWay(resource);
        const response = await gateway.post({action : 'sign-in'} , formSignin);
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
            dispatch({
                type : userType.SIGN_IN,
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

const signUpUser = (formSignup : Omit<FormSignup , 'confirmPassword'> , resource : string) : UserThunkAction => {
    return async (dispatch) => {
        dispatch({ type : responseType.START })
        const gateway = new GateWay(resource);
        const response = await gateway.post({action : 'sign-up'} , formSignup);
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
            dispatch({
                type : userType.SIGN_UP,
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

const showInforUser = () : UserThunkAction => {
    return async (dispatch , getState) => {
        const {user} = getState();
        dispatch({ type : responseType.START })
        const gateway = new GateWay('user' , user.token);
        const response = await gateway.get({action : 'show'});
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
            dispatch({
                type : userType.SHOW,
                payload : {...response.result, token : user.token}
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

const updateUser = (updatedProfile : User) : UserThunkAction => {
    return async (dispatch , getState) => {
        const {user} = getState();
        dispatch({ type : responseType.START })
        const gateway = new GateWay('user' , user.token);
        const response = await gateway.post({action : 'update'} , updatedProfile);
 
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
                payload : {...response.result , token : user.token}
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

const changePassword = (password : FormPassword) : UserThunkAction => {
    return async (dispatch , getState) => {
        const {user} = getState();
        dispatch({ type : responseType.START })
        const gateway = new GateWay('user' , user.token);
        const passwordPayload = {
            old_password : password.oldPassword,
            new_password : password.newPassword
        }
        const response = await gateway.post({action : 'change-password'} , passwordPayload);
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
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

const reserInforUser = () : UserThunkAction => {
    return async (dispatch , getState) => {
        dispatch({
            type : userType.RESET,
            payload : null
        })
    }
}

export const userAction = {
    signInUser,
    signUpUser,
    showInforUser,
    updateUser,
    changePassword,
    reserInforUser
}