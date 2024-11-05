export const RESOURCES: { [resourceName : string] : {[action : string] : string} } = {
    'user' : {
        'sign_in' : '/api/user/sign_in',
        'sign_up' : '/api/user/sign_up',
        'show' : '/user/profile',
        'update' : '/user/profile',
        'change-password' : '/user/change-password',
        'show-tr' : '/public/type-room/list',
        'create-re' : '/user/reservation/add',
        'show-available-room' : '/user/available-room'
    },
    'employee' : {
        'sign-in' : '/employee/sign-in'
    },
    'customer' : {
        'sign-in' : '/customer/sign-in',
        'sign-up' : '/customer/sign-up',
        'show-list-re' : '/customer/reservation/list',
        'cancel' : '/customer/reservation/:reservation_id/cancel'
    },
    'admin' : {
        // user
        'create-user' : '/admin/user/add',
        'show-user' : '/admin/user/list',
        'update-user' : '/admin/user/update/:user_id',
        // amenity
        'show-ame' : '/admin/amenity/list',
        'create-ame' : '/admin/amenity/add',
        // type-room
        'create-tr' : '/admin/type-room/add',
        'update-tr' : '/admin/type-room/update/:type_room_id',
        'delete-tr' : '/admin/type-room/update/:type_room_id',
        // room
        'show-room' : '/admin/room/list',
        'create-room' : '/admin/room/add',
        // reservation
        'show-re' : '/admin/reservation/list',
        'update-re': '/admin/reservation/:reservation_id/update',
        // upload image
        'upload' : '/admin/type-room/:type_room_id/image'
    },
    'public' : {
        'show-ame' : '/public/amenity/list',
    }
}