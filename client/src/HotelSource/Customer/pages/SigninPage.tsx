import SigninForm from "../components/SigninForm";
import { useNavigate } from "react-router-dom";
import { Account } from "../../../types/models";
import { useEffect, useState } from "react";
import { useSelector , useDispatch } from 'react-redux';
import { userAction } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers";

export default function SigninPage() {
  const navigate = useNavigate();
  const {response , user} = useSelector<RootState , RootState>(state => state);
  const dispatch = useDispatch();
  const [msgSignin , setMsgSignin] = useState<string>('');

  const handleSignIn = async (formSignin : Account) => {
    dispatch(userAction.updateUser(formSignin) as any)
  }

  const handleResetMsgSignin = () => {
    if(msgSignin != ''){
      setMsgSignin('')
    }
  }

  useEffect(() => {
    if(response.isLoading || response.status == 0) return;
    if(response.status == 200){
      navigate('/')
    }else{
      setMsgSignin(response.message)
    }
  }, [user , response])

  return (
    <div className="bl_signinPage_container">
      <div className="bl_signinForm">
        <div className="bl_signinForm_header">Sign in</div>
        <div className="bl_signinForm_body">
          <SigninForm
            onSignIn={handleSignIn}
            onHiddenErrorMsg={handleResetMsgSignin}
          />
        </div>
        <div className="bl_signinForm_footer">
          Don't have an account?
          <div className="bl_signinForm_footer__main">sign up</div>
        </div>
      </div>
    </div>
  )
}
