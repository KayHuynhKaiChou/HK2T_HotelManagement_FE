export interface Account {
    email : string,
    password : string
} 

export interface User extends Account{
    id ?: number,
    firstname ?: string,
    surname ?: string,
    city ?: string,
    district ?: string,
    ward ?: string,
    address ?: string,
    phone ?: string,
    id_card ?: string,
    birth_day ?: string,
    gender ?: 'MALE' | 'FEMALE' | 'OTHER',
    position ?: 'CUSTOMER' | 'ADMIN' | 'HOUSEKEEPER' | 'RECEPTIONIST'
    salary ?: number,
    link_avatar ?: string,
    booked_rooms ?: Room[]
}

export interface Room {
    id ?: number,
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


