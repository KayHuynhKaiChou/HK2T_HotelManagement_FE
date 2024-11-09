export interface ResponseFormat {
    isLoading ?: boolean;
    status : Response['status'];
    success ?: boolean;
    message : string;
    result ?: any;
}

export interface ResultChart {
    quarter?: string;
    month_name?: string;
    month_number?: number;
    type_room?: {
        type_room_id: number;
        type_room_title: string;
        total_booked: number;
    }[];
    revenue?: number;
}