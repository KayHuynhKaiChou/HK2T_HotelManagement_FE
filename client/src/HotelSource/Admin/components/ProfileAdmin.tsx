import { useSelector } from "react-redux";
import FormUpdateProfile, { FormUpdateProfileHandle } from "./FormUpdateProfile";
import { RootState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { userAction } from "../../../redux/actions/user";
import { useEffect, useRef } from "react";
import { FormPassword, FormUserEmployee } from "../../../types/form";
import { User } from "../../../types/models";
import LoadingHk2t from "../../../common/LoadingHk2t";
import FormChangePassword, { FormChangePasswordHandle } from "./FormChangePassword";
import { toast } from "react-toastify";
import { toastMSGObject } from "../../../utils";

export default function ProfileAdmin() {
    //redux
    const {user , response} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch();

    //ref
    const formUpdateProfile = useRef<FormUpdateProfileHandle | null>(null);
    const formChangePassword = useRef<FormChangePasswordHandle | null>(null); 
   
    //func handle submit form
    const handleUpdateProfile = (updatedProfile : FormUserEmployee) => {
        const formatUpdatedProfile : User = {
            ...updatedProfile,
            link_avatar : updatedProfile.link_avatar.replace('data:', '').replace(/^.+,/, ''),
            city : updatedProfile.city.value + '',
            district : updatedProfile.district.value + '',
            ward : updatedProfile.ward.value + ''
        }
        dispatch(userAction.updateUser(formatUpdatedProfile) as any)
    }

    const handleChangePassword = async (password : FormPassword) => {
        dispatch(userAction.changePassword(password) as any)
    } 

    //useEffect 
    useEffect(() => { // update success and show toast
        const formState = formUpdateProfile.current!.form.formState!
        if(response.status == 200 && formState.isSubmitSuccessful){
            toast.success(response.message , toastMSGObject());
        }
    },[user])

    useEffect(() => { // update success and show toast
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

    useEffect(() => {
        dispatch(userAction.showInforUser() as any)
    },[])

    return (
        <div className="bl_profileAdmin">
            <div className="bl_profileAdmin_inner">
                {response.isLoading && (
                    <LoadingHk2t/>
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
