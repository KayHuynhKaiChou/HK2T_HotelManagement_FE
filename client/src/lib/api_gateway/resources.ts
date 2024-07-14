export const RESOURCES: { [resourceName : string] : {[action : string] : string} } = {
    'user' : {
        'sign_in' : '/api/user/sign_in',
        'sign_up' : '/api/user/sign_up',
        'show' : '/user/profile',
        'update' : '/user/profile',
        'change-password' : '/user/change-password'
    },
    'employee' : {
        'sign-in' : '/employee/sign-in'
    },
    'customer' : {
        'sign-in' : '/customer/sign-in',
        'sign-up' : '/customer/sign-up'
    },
    'admin' : {
        // user
        'show-user' : '/admin/user/list',
        'update-user' : '/admin/user/update/:user_id',
        // amenity
        'show-ame' : '/admin/amenity/list',
        'create-ame' : '/admin/amenity/add',
        // type-room
        'show-tr' : '/admin/type-room/list',
        'create-tr' : '/admin/type-room/add',
        'update-tr' : '/admin/type-room/update/:type_room_id',
        'delete-tr' : '/admin/type-room/update/:type_room_id',
        // room
        'show-room' : '/admin/room/list',
        'create-room' : '/admin/room/add',
        // upload image
        'upload' : '/admin/type-room/:type_room_id/image'
    }
}