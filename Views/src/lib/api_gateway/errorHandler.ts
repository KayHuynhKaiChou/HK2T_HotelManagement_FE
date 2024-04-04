import { ResponseError } from ".";

const abortController = new AbortController();

export function errorHandler(
    status: number
): (response: Response, path: string, params: object) => Promise<{ status: number; body: any}> {
    switch(status) {
        case 200:
            return defaultHandler;
        case 400:
            return defaultHandler;
        case 404:
            return defaultHandler;
        case 422:
            return defaultHandler;
        case 401:
            abortController.abort();
            alert('xác thực đã hết hạn . Làm mới trang');
            window.document.location.reload();
            return defaultHandler;
        case 403:
            abortController.abort();
            return defaultHandler;
        default:
            return (response: Response, path: string, params: object) => {
                throw new ResponseError('Something went wrong', path, response.status, params)
            }
    }
}

const defaultHandler = (response: Response) => 
    response.json().then((body) => ({status: response.status, body}))