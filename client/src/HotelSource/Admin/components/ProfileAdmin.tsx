import { useSelector } from "react-redux";
import FormUpdateProfile, { FormUpdateProfileHandle } from "../../../common/FormProfile/FormUpdateProfile";
import { RootState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { userAction } from "../../../redux/actions/user";
import { useRef } from "react";
import { FormPassword, FormUserProfile } from "../../../types/form";
import LoadingHk2tComponent from "../../../common/Loading/LoadingHk2tComponent";
import FormChangePassword, { FormChangePasswordHandle } from "../../../common/FormPassword/FormChangePassword";
import { toast } from "react-toastify";
import { formatUpdatedProfile, toastMSGObject } from "../../../utils";
import useEffectSkipFirstRender from "../../../hooks/useEffectSkipFirstRender";

export default function ProfileAdmin() {
    //redux
    const {user , response} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch();

    //ref
    const formUpdateProfile = useRef<FormUpdateProfileHandle | null>(null);
    const formChangePassword = useRef<FormChangePasswordHandle | null>(null); 
   
    //func handle submit form
    const handleUpdateProfile = (updatedProfile : FormUserProfile) => {
        const resultFormat = formatUpdatedProfile(updatedProfile)
        dispatch(userAction.updateUser(resultFormat) as any)
    }

    const handleChangePassword = async (password : FormPassword) => {
        dispatch(userAction.changePassword(password) as any)
    } 

    //useEffect 
    useEffectSkipFirstRender(() => { // update success and show toast
        const formState = formUpdateProfile.current!.form.formState!
        if(response.status == 200 && formState.isSubmitSuccessful){
            toast.success(response.message , toastMSGObject());
        }
    },[user])

    useEffectSkipFirstRender(() => { // update success and show toast
        const formState = formChangePassword.current!.form.formState!
        if(response.status == 200 && formState.isSubmitSuccessful){
            formChangePassword.current?.form.reset({
                oldPassword : '',
                newPassword : '',
                confirmPassword : ''
            })
            toast.success(response.message , toastMSGObject());
        } else if(response.status == 400) {
            toast.error(response.message , toastMSGObject());
        }
    },[response])

    return (
        <div className="bl_profile">
            <div className="bl_profile_inner">
                {response.isLoading && (
                    <LoadingHk2tComponent/>
                )}               
                <FormUpdateProfile
                    ref={formUpdateProfile}
                    user={user}
                    onUpdateProfile={handleUpdateProfile}
                />
                <FormChangePassword
                    ref={formChangePassword}
                    onChangePassword={handleChangePassword}
                />
            </div>
        </div>
    )
}
