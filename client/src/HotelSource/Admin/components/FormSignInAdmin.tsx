import {useForm  , SubmitHandler} from 'react-hook-form'
import { Button } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Account } from '../../../types/models';
import InputHk2t from '../../../common/InputHk2t';

interface FormSignInProps {
  handleSignIn : (values : Account) => void
}

function FormSignInAdmin(props : FormSignInProps) {
  const {handleSignIn} = props
  
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
    <form onSubmit={form.handleSubmit(handleSignIn as SubmitHandler<Account>)}>
      <InputHk2t name='email' placeholder='Email' form={form} />
      <InputHk2t name='password' placeholder='Password' typeInput='password' form={form} />
      <div className="bl_btn__login">
        <Button
          size='medium'
          type="submit"
          variant="contained"
          color='inherit'
          sx={{ mt: 2, mb: 2 }}
        >
          Sign In
        </Button> 
      </div>
    </form>
  )
}

export default FormSignInAdmin

