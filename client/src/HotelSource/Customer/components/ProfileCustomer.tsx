import { useSelector } from "react-redux";
import LoadingHk2tComponent from "../../../common/Loading/LoadingHk2tComponent";
import { useRef } from "react";
import { RootState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import FormUpdateProfile, { FormUpdateProfileHandle } from "../../../common/FormProfile/FormUpdateProfile";
import { userAction } from "../../../redux/actions/user";
import { FormUserProfile } from "../../../types/form";
import { formatUpdatedProfile, toastMSGObject } from "../../../utils";
import { toast } from "react-toastify";
import useEffectSkipFirstRender from "../../../hooks/useEffectSkipFirstRender";

export default function ProfileCustomer() {
    //redux
    const {user , response} = useSelector<RootState , RootState>(state => state);
    const profileClone = {...user};
    delete profileClone.token;
    delete profileClone._persist;
    const dispatch = useDispatch();

    //ref
    const formUpdateProfile = useRef<FormUpdateProfileHandle | null>(null);

    //func handle submit form
    const handleUpdateProfile = (updatedProfile : FormUserProfile) => {
        const payloadResult = formatUpdatedProfile(updatedProfile)
        dispatch(userAction.updateUser(payloadResult) as any)
    }

    //useEffect 
    useEffectSkipFirstRender(() => { // update success and show toast
        const formState = formUpdateProfile.current!.form.formState!
        if(response.status == 200 && formState.isSubmitSuccessful){
            toast.success(response.message , toastMSGObject());
        }
    },[user])

    return (
        <div className="bl_profile">
            <div className="bl_profile_inner">
                {response.isLoading && (
                    <LoadingHk2tComponent/>
                )}               
                <FormUpdateProfile
                    ref={formUpdateProfile}
                    user={profileClone}
                    onUpdateProfile={handleUpdateProfile}
                />
            </div>
        </div>
    )
}
