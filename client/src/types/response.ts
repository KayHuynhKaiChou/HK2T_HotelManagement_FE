export interface ResponseFormat {
    isLoading ?: boolean;
    status : Response['status'];
    success ?: boolean;
    message : string;
    result ?: any;
}