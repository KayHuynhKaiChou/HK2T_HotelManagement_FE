export interface Account {
    email : string;
    password : string;
} 

interface Timestamp {
    created_at ?: string;
    updated_at ?: string;
}

export interface User extends Timestamp{
    id ?: number;
    firstname : string;
    surname : string;
    email : Account['email'];
    password ?: string
    city ?: string;
    district ?: string;
    ward ?: string;
    address ?: string;
    phone ?: string;
    birth_day ?: string;
    gender ?: 1 | 2;
    position ?: 1 | 2 | 3 | 4;
    salary ?: number;
    link_avatar ?: string;
    status ?: 0 | 1;
    token ?: string;
    booked_rooms ?: Room[];
    _persist ?: any;
}

export interface Room extends Timestamp{
    id ?: number;
    type_room : TypeRoom;
    room_number : string;
    floor : number;
    status : 0 | 1;
}

export interface TypeRoom extends Timestamp{
    id ?: number;
    title : string;
    preferential_services?: string;
    size : number;
    view_direction : 1 | 2;
    adult_capacity : number;
    kids_capacity : number;
    base_price : number;
    amenities : Array<Amenity['id']>;
    images : Array<string>;
    status : 0 | 1;
}

export interface Amenity extends Timestamp{
    id ?: number;
    type : number;
    name: string;
    status: number;
}

export type TypeAmenity = 'general' | 'bathroom' | 'other';

export type TypeObjAmenity = {
    [K in TypeAmenity] : Amenity[];
}

export interface Reversation extends Timestamp{
    id ?: number;
    user_id : number;
    checkin_at : string;
    checkout_at : string;
    adult_number : number;
    kid_number : number;
    status : number;
    total_price : number;
    room : Room; 
}

