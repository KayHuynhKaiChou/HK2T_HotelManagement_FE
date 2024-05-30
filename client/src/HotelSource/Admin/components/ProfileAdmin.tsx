import { useSelector } from "react-redux";
import FormUpdateProfile from "./FormUpdateProfile";
import { RootState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { userAction } from "../../../redux/actions/user";
import { useEffect } from "react";
import { FormUserEmployee } from "../../../types/form";
import { User } from "../../../types/models";
import LoadingHk2t from "../../../common/LoadingHk2t";

export default function ProfileAdmin() {
    const {user , response} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch();
   
    const handleUpdateProfile = (updatedProfile : FormUserEmployee) => {
        const formatUpdatedProfile : User = {
            ...updatedProfile,
            link_avatar : updatedProfile.link_avatar.replace('data:', '').replace(/^.+,/, ''),
            city : updatedProfile.city.value + '',
            district : updatedProfile.district.value + '',
            ward : updatedProfile.ward.value + ''
        }
        console.log({formatUpdatedProfile})
        dispatch(userAction.updateUser(formatUpdatedProfile) as any)
    }
    
    useEffect(() => {
        dispatch(userAction.showInforUser() as any)
    },[])

    return (
        <div className="bl_profileAdmin">
            <div className="bl_profileAdmin_inner">
                {response.status != 200 && (
                    <LoadingHk2t/>
                )}               
                <FormUpdateProfile
                    user={user}
                    onUpdateProfile={handleUpdateProfile}
                />
            </div>
        </div>
    )
}
