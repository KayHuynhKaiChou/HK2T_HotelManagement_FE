import {useForm  , SubmitHandler} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputHk2t from '../../../common/InputHk2t';
import ButtonHk2t from "../../../common/ButtonHk2t";
import { FormSignup } from "../../../types/form";

interface FormSignUpProps {
    onSignUp : (values : FormSignup) => void
    onHiddenErrorMsg : () => void
}

export default function FormSignUpCustomer(props : FormSignUpProps) {
    const {onSignUp , onHiddenErrorMsg} = props

    const schema = yup.object({
        firstname: yup.string()
            .required('Please enter firstname !'),
        surname: yup.string()
            .required('Please enter surname !'),
        email: yup.string()
            .email('Email is wrong format !')
            .required('Please enter email !'),
        password: yup.string()
            .required('Please enter password !')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), ''], 'Password must match new password')
            .required('Please enter confirm password !')
    });

    const form = useForm({
        defaultValues: {
            firstname : '',
            surname : '',
            email : '',
            password : '',
            confirmPassword : ''
        },
        resolver: yupResolver(schema)
    })

    return (
        <form onSubmit={form.handleSubmit(onSignUp as SubmitHandler<FormSignup>)}>
            <InputHk2t 
                name='firstname' 
                label="Firstname"
                placeholder='Firstname' 
                form={form}
                onFocus={onHiddenErrorMsg}
            />
            <InputHk2t 
                name='surname' 
                label="Surname"
                placeholder='Surname' 
                form={form}
                onFocus={onHiddenErrorMsg}
            />
            <InputHk2t 
                name='email' 
                label="Email"
                placeholder='Email' 
                form={form}
                onFocus={onHiddenErrorMsg}
            />
            <InputHk2t 
                name='password'
                label="Password" 
                placeholder='Password' 
                typeInput='password' 
                form={form}
                onFocus={onHiddenErrorMsg}
            />
            <InputHk2t 
                name='confirmPassword'
                label="Confirm Password" 
                placeholder='Confirm Password' 
                typeInput='password' 
                form={form}
                onFocus={onHiddenErrorMsg}
            />
            <div className="bl_btn__submit">
              <ButtonHk2t
                variant="contained"
                content='sign up'
                isUseForm={true}
              />
            </div>
        </form>
    )
}

