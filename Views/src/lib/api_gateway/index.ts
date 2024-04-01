interface Resource {
    [action : string] : string
}

const JSON_HEADER = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export class ResponseError extends Error {
    path: string;
    status: number;
    params: object;

    constructor(msg: string , path: string , status: number , params: object){
        super(msg)
        this.path = path
        this.status = status
        this.params = params
    }
}

export default class GateWay {
    resource: string;
    defaultParams: object;
    requestParams: object | null;

    constructor(resource: string , defaultParams: object , requestParams: object | null){
        this.resource = resource;
        this.defaultParams = defaultParams;
        this.requestParams = requestParams;
    }
}