import { useEffect, useRef } from "react";
import FormChangePassword, { FormChangePasswordHandle } from "../../../common/FormPassword/FormChangePassword";
import { useDispatch } from "react-redux";
import { userAction } from "../../../redux/actions/user";
import { FormPassword } from "../../../types/form";
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastMSGObject } from "../../../utils";
import LoadingHk2t from "../../../common/LoadingHk2t";

export default function ChangePasswordCustomer() {
    //redux
    const {response} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch();

    //ref
    const formChangePassword = useRef<FormChangePasswordHandle | null>(null); 

    //func handle submit form
    const handleChangePassword = async (password : FormPassword) => {
        dispatch(userAction.changePassword(password) as any)
    } 
    
    //useEffect 
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

    return (
        <div className="bl_profile">
            <div className="bl_profile_inner">
                {response.isLoading && (
                    <LoadingHk2t/>
                )}
                <FormChangePassword
                    position="CUSTOMER"
                    ref={formChangePassword}
                    onChangePassword={handleChangePassword}
                />
            </div>
        </div>
    )
}
