import { Action } from "redux";
import { TypeRoom } from "../../types/models";

type keyTypeRoomType = 'SHOW' | 'CREATE' | 'UPDATE'
type valueTypeRoomType = 'SHOW_TYPEROOM' | 'CREATE_TYPEROOM' | 'UPDATE_TYPEROOM'

export const typeRoomType : Record<keyTypeRoomType , valueTypeRoomType> = {
    SHOW : 'SHOW_TYPEROOM',
    CREATE : 'CREATE_TYPEROOM',
    UPDATE : 'UPDATE_TYPEROOM'
} as const

export interface TypeRoomAction extends Action<valueTypeRoomType>{
    payload : TypeRoom[] | null;
}