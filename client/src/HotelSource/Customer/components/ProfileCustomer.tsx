import { useSelector } from "react-redux";
import LoadingHk2t from "../../../common/LoadingHk2t";
import { useEffect, useRef } from "react";
import { RootState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import FormUpdateProfile, { FormUpdateProfileHandle } from "../../../common/FormProfile/FormUpdateProfile";
import { userAction } from "../../../redux/actions/user";
import { User } from "../../../types/models";
import { FormUserProfile } from "../../../types/form";
import { toastMSGObject } from "../../../utils";
import { toast } from "react-toastify";
import useEffectSkipFirstRender from "../../../hooks/useEffectSkipFirstRender";

export default function ProfileCustomer() {
    //redux
    const {user , response} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch();

    //ref
    const formUpdateProfile = useRef<FormUpdateProfileHandle | null>(null);

    //func handle submit form
    const handleUpdateProfile = (updatedProfile : FormUserProfile) => {
        const formatUpdatedProfile : User = {
            ...updatedProfile,
            link_avatar : updatedProfile.link_avatar.replace('data:', '').replace(/^.+,/, ''),
            city : updatedProfile.city.value + '',
            district : updatedProfile.district.value + '',
            ward : updatedProfile.ward.value + ''
        }
        dispatch(userAction.updateUser(formatUpdatedProfile) as any)
    }

    //useEffect 
    useEffectSkipFirstRender(() => { // update success and show toast
        const formState = formUpdateProfile.current!.form.formState!
        if(response.status == 200 && formState.isSubmitSuccessful){
            toast.success(response.message , toastMSGObject());
        }
    },[user])

    useEffect(() => {
        dispatch(userAction.showInforUser() as any)
    },[])

    return (
        <div className="bl_profile">
            <div className="bl_profile_inner">
                {response.isLoading && (
                    <LoadingHk2t/>
                )}               
                <FormUpdateProfile
                    ref={formUpdateProfile}
                    user={user}
                    onUpdateProfile={handleUpdateProfile}
                />
            </div>
        </div>
    )
}
