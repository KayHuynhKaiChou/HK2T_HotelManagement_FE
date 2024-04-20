import { errorHandler } from "./errorHandler";
import { RESOURCES } from "./resources";
import axios from 'axios';

const API_URL = import.meta.env.SERVER_URL;

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

const defaultConfig = {
    headers : {...JSON_HEADER},
    withCredentials : true
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
    defaultParams: object;
    requestParams: object | null;

    constructor(resource: string , defaultParams: object , requestParams: object | null){
        this.resource = resource;
        this.defaultParams = defaultParams;
        this.requestParams = requestParams;
    }

    response(response : AxiosResponse, path : string, params: object){
        const status: number = response.status;
        return errorHandler(status)(response, path, params)
    }

    async get(params: URLParams, requestParams: RequestParams = null) {
        if(!RESOURCES[this.resource][params.action]) throw new Error('No action found')

        const path = buildPath(RESOURCES[this.resource], {...params, ...this.defaultParams})

        const result = await axios.get(path , {...defaultConfig , signal: abortController.signal})
        
        return this.response(result , path , params);
    }

    async post(params: URLParams, requestParams: RequestParams = null) {
        if(!RESOURCES[this.resource][params.action]) throw new Error('No action found')

        const path = buildPath(RESOURCES[this.resource], {...params, ...this.defaultParams})

        let result = null;
        if(requestParams instanceof FormData){
            result = await axios.post(path , {...defaultConfig , signal: abortController.signal})
        }else{
            result = await axios.post(path , {...defaultConfig , requestParams ,signal: abortController.signal})
        }
        return this.response()
    }
}