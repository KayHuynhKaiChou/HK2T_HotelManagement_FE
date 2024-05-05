import { Action } from "redux";
import { ResponseFormat } from "../../types/response";

type keyResponseType = "START" | "SUCCESS" | "FAILURE";
type valueResponseType = keyResponseType;

export const responseType : Record<keyResponseType , valueResponseType> = {
    START : "START",
    SUCCESS : "SUCCESS",
    FAILURE : "FAILURE"
}

export interface ResponseAction extends Action<valueResponseType>{
    payload : ResponseFormat | null;
}
