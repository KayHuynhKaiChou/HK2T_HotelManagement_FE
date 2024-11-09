const getMsgNotification = (action: string, nameObj: string) => {
    return {
        'SUCCESS': `${action} new ${nameObj} successfully !`,
        'FAIL': `${action} new ${nameObj} failed !`
    }
}

export const MESSAGE = {
    USER : {
        'CREATE': getMsgNotification('create', 'user'),
        'UPDATE': getMsgNotification('update', 'user'),
        'CHANGE_STATUS': {
            'INACTIVED': 'Account has been inactived successfully !',
            'ACTIVED': 'Account has been actived successfully !',
            'FAIL': 'Account change status failed !'
        }
    },
    AMENITY : {
        'CREATE': getMsgNotification('create', 'amenity')
    },
    TYPE_ROOM : {
        'CREATE': getMsgNotification('create', 'type room'),
        'UPDATE': getMsgNotification('update', 'type room'),
    },
    ROOM : {
        'CREATE': getMsgNotification('create', 'room'),
        'UPDATE': getMsgNotification('update', 'room'),
    },
    REVERSATION : {
        'CREATE': getMsgNotification('create', 'reversation'),
        'UPDATE': getMsgNotification('update', 'reversation'),
        'NO_AVAILABLE_ROOM': 'This room type is currently fully booked, please change to another room type.',
        'STATUS_OPEN': {
            'CANCEL_SUCCESS' : 'You have successfully canceled, please contact admin via phone number to return the deposit.'
        },
        'STATUS_IN_PROGRESS': {
            'CONFIRM_CANCEL' : 'Are you sure you want to cancel, if you agree you will lose your deposit.',
            'CANCEL_SUCCESS' : 'You have successfully canceled !'
        }
    },
    CONFIRM_SUBMIT : 'Your changes have not summited yet, you still wanna change to another part',
    SEND_EMAIL : {
        'DEPOSIT' : 'Admin Hotel Hk2t has received your deposit',
        'SUCCESS' : 'Send email reply to '
    }
    
}