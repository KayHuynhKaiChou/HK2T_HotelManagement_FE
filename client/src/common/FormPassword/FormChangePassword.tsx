import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import * as yup from "yup";
import { FormPassword } from '../../types/form';
import { Divider, Grid } from '@mui/material';
import InputHk2t from '../InputHk2t';
import ButtonHk2t from '../ButtonHk2t';
import { forwardRef, useImperativeHandle } from 'react';

interface FormChangePasswordProps {
    position ?: 'CUSTOMER' | 'EMPLOYEE';
    onChangePassword : (values : FormPassword) => void;
}

export interface FormChangePasswordHandle {
    form : UseFormReturn<FormPassword>
}

const FormChangePassword = forwardRef<FormChangePasswordHandle , FormChangePasswordProps>((props , ref) => {
    const {position = 'EMPLOYEE', onChangePassword} = props;

    const schema = yup.object({
        oldPassword: yup.string()
            .required('Please enter old password !')
            .min(6, 'Password must be at least 6 characters'),
        newPassword: yup.string()
            .required('Please enter new password !')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('newPassword'), ''], 'Password must match new password')
            .required('Please enter confirm password !')
    });

    //hook form
    const form : UseFormReturn<FormPassword> = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        resolver: yupResolver(schema)
    })

    // useImperativeHandle hook
    useImperativeHandle(ref , () => ({ form }))

    return (
        <form 
            onSubmit={form.handleSubmit(onChangePassword as SubmitHandler<FormPassword>)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">Password</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
                    <Grid container columnSpacing={3}>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='old password' 
                                name='oldPassword' 
                                placeholder='old password' 
                                form={form} 
                            />                        
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='new password' 
                                name='newPassword' 
                                placeholder='new password' 
                                form={form} 
                            />                        
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='confirm password' 
                                name='confirmPassword' 
                                placeholder='confirm password' 
                                form={form} 
                            />                        
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={`bl_btn__submit ${position == 'EMPLOYEE' ? 'for_employee' : 'for_customer'}`}>
                <ButtonHk2t
                    variant="contained"
                    content='change password'
                    isUseForm={true}
                /> 
            </div>
        </form>
    )
})

export default FormChangePassword
