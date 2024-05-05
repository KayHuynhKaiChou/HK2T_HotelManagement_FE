import { errorHandler } from "./errorHandler";
import { RESOURCES } from "./resources";

const API_URL = import.meta.env.VITE_API_URL;

const abortController = new AbortController();

interface Resource {
    [action : string] : string
}

interface URLParams {
    action : string;
    [key: string] : string;
}

type RequestParams = null | object | FormData

const JSON_HEADER = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

const defaultHeader = {
    ...JSON_HEADER
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

export const buildPath = function (resource: Resource, params: URLParams) {
    let path = resource[params.action]
    Object.keys(params).forEach((key) => {
        path = path.replace(`:${key}`, params[key]);
    });

    return API_URL + path
}

export default class GateWay {
    resource: string;
    defaultParams: object | null;
    requestParams: object | null;
    accessToken: string | undefined;

    constructor(resource: string , accessToken?: string){
        this.resource = resource;
        this.defaultParams = {};
        this.requestParams = null;
        this.accessToken = accessToken;
    }

    response(response : Response, path : string, params: object){
        const status: number = response.status;
        return errorHandler(status)(response, path, params)
    }

    authHeader(){
        return {
            'Authorization' : `Bearer ${this.accessToken}`
        }
    }

    async get(params: URLParams) {
        if(!RESOURCES[this.resource][params.action]) throw new Error('No action found')

        const path = buildPath(RESOURCES[this.resource], {...params, ...this.defaultParams})

        //const result = await axios.get(path , {...defaultConfig , signal: abortController.signal})
        const result = await fetch(
            path,
            {
                method : 'GET',
                headers : defaultHeader,
                signal: abortController.signal
            }
        )

        return this.response(result , path , params);
    }

    async post(params: URLParams, requestParams: RequestParams = null) {
        if(!RESOURCES[this.resource][params.action]) throw new Error('No action found')

        const path = buildPath(RESOURCES[this.resource], {...params, ...this.defaultParams})

        let result = null;
        if(requestParams instanceof FormData){
            result = await fetch(
                path,
                {
                    method : 'POST',
                    headers : defaultHeader,
                    body : requestParams,
                    signal: abortController.signal
                }
            )
        }else{
            result = await fetch(
                path,
                {
                    method : 'POST',
                    headers : defaultHeader,
                    body : JSON.stringify(requestParams),
                    signal: abortController.signal
                }
            )        
        }
        return this.response(result, path, params)
    }
}