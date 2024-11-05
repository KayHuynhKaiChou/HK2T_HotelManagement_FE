import { useLocation, useNavigate } from "react-router-dom";
import { Account } from "../../../types/models";
import { useState } from "react";
import { useSelector , useDispatch } from 'react-redux';
import { userAction } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers";
import FormSignInCustomer from "../components/FormSignInCustomer";
import useEffectSkipFirstRender from "../../../hooks/useEffectSkipFirstRender";

export default function SigninPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {response , user} = useSelector<RootState , RootState>(state => state);
  const dispatch = useDispatch();
  const [msgSignin , setMsgSignin] = useState<string>('');

  const handleSignIn = (formSignin : Account) => {
    dispatch(userAction.signInUser(formSignin , 'customer') as any)
  }

  const handleResetMsgSignin = () => {
    if(msgSignin != ''){
      setMsgSignin('')
    }
  }

  useEffectSkipFirstRender(() => {
    if(response.isLoading || response.status == 0) return;
    if(response.status == 200){
      state === '/reservation/person-infor' ? navigate(state) : navigate('/')
    }else{
      setMsgSignin(response.message)
    }
  }, [user , response])

  return (
    <div className="bl_signInPage_container">
      <div className="bl_signInForm">
        <div className="bl_signInForm_header">sign in</div>
        <div className="bl_signInForm_msg">{msgSignin}</div>
        <div className="bl_signInForm_body">
          <FormSignInCustomer
            onSignIn={handleSignIn}
            onHiddenErrorMsg={handleResetMsgSignin}
          />
        </div>
        <div className="bl_signInForm_footer">
          Don't have an account?
          <div 
            className="bl_signInForm_footer__main"
            onClick={() => navigate('/sign_up')}
          >
            sign up
          </div>
        </div>
      </div>
    </div>
  )
}
