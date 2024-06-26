export interface Account {
    email : string;
    password : string;
} 

export interface User {
    id ?: number;
    firstname : string;
    surname : string;
    email : Account['email'];
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
}

export interface Room {
    id ?: number;
    type_room : TypeRoom;
    room_number ?: number;
    floor : number;
    status : 0 | 1;
}

export interface TypeRoom {
    id ?: number;
    title : string;
    preferential_services : string;
    size : number;
    view_direction : 1 | 2;
    adult_capacity : number;
    kids_capacity : number;
    base_price : number;
    amenities : Array<Amenity['id']>;
    images : Array<string>;
    status : 0 | 1;
}

export interface Amenity {
    id : number;
    type :  1 | 2 | 3;
    name: string;
    status: 0 | 1;
}

export type TypeAmenity = 'general' | 'bathroom' | 'other';

export type TypeObjAmenity = {
    [K in TypeAmenity] : Amenity[];
}

