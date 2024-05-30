export interface Account {
    email : string,
    password : string
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
    position ?: 'CUSTOMER' | 'ADMIN' | 'HOUSEKEEPER' | 'RECEPTIONIST'
    salary ?: number;
    link_avatar ?: string;
    token ?: string;
    booked_rooms ?: Room[];
}

export interface Room {
    id ?: number;
    type_room : TypeRoom,
    room_number ?: number,
    checkin_at : string,
    checkout_at : string,
    floor : number
    description ?: number,
    status : 'OPEN' | 'IN_PROGRESS' | 'END' | 'CANCEL'
}

export interface TypeRoom {
    id ?: number,
    title : string,
    type : 'ROOM' | 'HALL',
    adult_capacity : number,
    kids_capacity : number,
    base_price : number,
    amenities : Array<number>
}


