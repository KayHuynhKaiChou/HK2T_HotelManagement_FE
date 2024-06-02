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
        'show' : '/admin/user/list'
    }
}