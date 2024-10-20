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
    CONFIRM_SUBMIT : 'Your changes have not summited yet, you still wanna change to another part'
    
}