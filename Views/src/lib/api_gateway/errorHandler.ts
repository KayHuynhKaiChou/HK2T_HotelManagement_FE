
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
    }
}

const defaultHandler = (response: Response) => 
    response.json().then((body) => ({status: response.status, body}))