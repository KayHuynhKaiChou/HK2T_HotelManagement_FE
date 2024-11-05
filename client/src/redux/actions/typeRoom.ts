import { ThunkAction  } from "redux-thunk";
import GateWay from "../../lib/api_gateway"
import { TypeRoom } from "../../types/models"
import { ResponseAction, responseType } from "../constants/responseType"
import { Action } from 'redux';
import { RootState } from "../reducers";
import { TypeRoomAction, typeRoomType } from "../constants/typeRoomType";
import { refetchList } from "../helper";

export type typeRoomThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<TypeRoomAction['type'] | ResponseAction['type']>>;

const showAllTypeRoom = () : typeRoomThunkAction => {
    return async (dispatch , getState) => {
        const {user} = getState();
        dispatch({ type : responseType.START })
        const gateway = new GateWay('user' , user.token);
        const response = await gateway.get({action : 'show-tr'});
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
            dispatch({
                type : typeRoomType.SHOW,
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

const createNewTypeRoom = (typeRoom : TypeRoom) : typeRoomThunkAction => {
    return async (dispatch , getState) => {
        const {user, typeRooms} = getState();
        dispatch({ type : responseType.START })
        const gateway = new GateWay('admin' , user.token);
        const response = await gateway.post({action : 'create-tr'} , typeRoom);
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
            dispatch({
                type : typeRoomType.CREATE,
                payload : refetchList(
                    [...typeRooms],
                    'CREATE',
                    response.result
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
        return response
    }
}

const updateTypeRoom = (idTypeRoom : string, typeRoom : TypeRoom) : typeRoomThunkAction => {
    return async (dispatch , getState) => {
        const {user, typeRooms} = getState();
        dispatch({ type : responseType.START })
        const gateway = new GateWay("admin" , user.token)
        const response = await gateway.post({ action : "update-tr" , type_room_id : idTypeRoom} , typeRoom)
 
        if (response.status == 200){
            dispatch({
                type : responseType.SUCCESS,
                payload : {
                    status : response.status,
                    message : response.message
                }
            })
            dispatch({
                type : typeRoomType.UPDATE,
                payload : refetchList(
                    [...typeRooms],
                    'UPDATE',
                    response.result
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
        return response
    }
}

export const typeRoomAction = {
    showAllTypeRoom,
    createNewTypeRoom,
    updateTypeRoom
}