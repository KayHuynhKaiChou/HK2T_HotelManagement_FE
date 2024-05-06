import { Account } from "../../../types/models"
import {useForm  , SubmitHandler} from 'react-hook-form'
import { Button } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputHk2t from '../../../common/InputHk2t';
import {EmailOutlined , LockOpenOutlined} from '@mui/icons-material';

interface FormSignInProps {
    onSignIn : (values : Account) => void
    onHiddenErrorMsg : () => void
}

export default function SigninForm(props : FormSignInProps) {
    const {onSignIn , onHiddenErrorMsg} = props

    const schema = yup.object({
        email: yup.string()
          .required('Please enter email !'),
        password: yup.string()
          .required('Please enter password !')
    });

    const form = useForm({
        defaultValues: {
        email : '',
        password : ''
        },
        resolver: yupResolver(schema)
    })

    return (
        <form onSubmit={form.handleSubmit(onSignIn as SubmitHandler<Account>)}>
            <InputHk2t 
                name='email' 
                label="Email"
                placeholder='Email' 
                form={form} 
                iconInput={<EmailOutlined/>}
                onFocus={onHiddenErrorMsg}
            />
            <InputHk2t 
                name='password'
                label="Password" 
                placeholder='Password' 
                typeInput='password' 
                form={form} 
                iconInput={<LockOpenOutlined/>}
                onFocus={onHiddenErrorMsg}
            />
            <div className="bl_btn__login">
                <Button
                    size='medium'
                    type="submit"
                    variant="contained"
                >
                    Sign In
                </Button> 
            </div>
        </form>
    )
}
