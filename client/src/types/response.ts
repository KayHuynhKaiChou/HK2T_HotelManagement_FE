export interface ResponseFormat {
    isLoading ?: boolean;
    status : Response['status'];
    success ?: boolean;
    error ?: string;
    message : string;
    data ?: any;
}