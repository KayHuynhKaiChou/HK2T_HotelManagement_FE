import { useNavigate } from "react-router-dom";
import { Account } from "../../../types/models";
import { CssBaseline } from "@mui/material";
import FormSignInAdmin from "../components/FormSignInAdmin";
import { useEffect, useState } from "react";
import { useSelector , useDispatch } from 'react-redux';
import { userAction } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers";
import useEffectSkipFirstRender from "../../../hooks/useEffectSkipFirstRender";
import { POSITION } from "../../../types/enum";
import { useLoadingHk2tScreen } from "../../../common/Loading/LoadingHk2tScreen";

export default function AdminSigninPage() {
  const navigate = useNavigate();
  const {response , user} = useSelector<RootState , RootState>(state => state);
  const dispatch = useDispatch();
  const [msgSignin , setMsgSignin] = useState<string>('');
  const loading = useLoadingHk2tScreen();

  const handleSignIn = async (formSignin : Account) => {
    loading.show();
    dispatch(userAction.signInUser(formSignin , 'employee') as any)
  }

  const handleResetMsgSignin = () => {
    if(msgSignin != ''){
      setMsgSignin('')
    }
  }

  useEffect(() => {
    if (user.token && user.position !== POSITION.CUSTOMER) {
      navigate('/admin/dashboard')
    }
  }, [])

  useEffectSkipFirstRender(() => {
    if(response.isLoading || response.status == 0) return;
    if(response.status == 200){
      navigate('/admin/dashboard')
    }else{
      setMsgSignin(response.message)
    }
    loading.hide();
  }, [user , response])

  return (
    <div className="bl_signInPageAdmin">
      <CssBaseline/>
      <div className="bl_signInPageAdmin_wrapper">
        <h1 className="bl_signInPageAdmin_ttl">sign in</h1>
        <div className="bl_signInPageAdmin_msg">{msgSignin}</div>
        <div className="bl_signInPageAdmin_form">
          <FormSignInAdmin 
            onSignIn={handleSignIn}
            onHiddenErrorMsg={handleResetMsgSignin}
          />
        </div>
      </div>
    </div>
  )
}
