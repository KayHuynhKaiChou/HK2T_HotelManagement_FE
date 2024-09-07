import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector , useDispatch } from 'react-redux';
import { userAction } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers";
import FormSignUpCustomer from "../components/FormSignUpCustomer";
import { FormSignup } from "../../../types/form";
import useEffectSkipFirstRender from "../../../hooks/useEffectSkipFirstRender";

export default function SignupPage() {
  const navigate = useNavigate();
  const {response , user} = useSelector<RootState , RootState>(state => state);
  const dispatch = useDispatch();
  const [msgSignup , setMsgSignup] = useState<string>('');

  const handleSignUp = (formSignup : FormSignup) => {
    const {confirmPassword , ...formatFormSignup} = formSignup
    dispatch(userAction.signUpUser(formatFormSignup , 'customer') as any)
  }

  const handleResetMsgSignup = () => {
    if(msgSignup != ''){
      setMsgSignup('')
    }
  }

  useEffectSkipFirstRender(() => {
    if(response.isLoading || response.status == 0) return;
    if(response.status == 200){
      navigate('/')
    }else{
      setMsgSignup(response.message)
    }
  }, [user , response])

  return (
    <div className="bl_signInPage_container">
      <div className="bl_signInForm">
        <div className="bl_signInForm_header">sign up</div>
        <div className="bl_signInForm_msg">{msgSignup}</div>
        <div className="bl_signInForm_body">
          <FormSignUpCustomer
            onSignUp={handleSignUp}
            onHiddenErrorMsg={handleResetMsgSignup}
          />
        </div>
        <div className="bl_signInForm_footer">
          You have an account?
          <div 
            className="bl_signInForm_footer__main"
            onClick={() => navigate('/sign_in')}
          >
            sign in
          </div>
        </div>
      </div>
    </div>
  )
}
