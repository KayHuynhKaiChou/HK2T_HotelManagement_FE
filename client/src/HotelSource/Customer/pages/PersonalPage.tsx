import { HistoryOutlined, LockOutlined, PersonOutline } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ComponentType, useEffect, useState } from "react";
import ProfileCustomer from "../components/ProfileCustomer";
import ChangePasswordCustomer from "../components/ChangePasswordCustomer";
import UploadFileBtnHk2t from "../../../common/UploadFileBtnHk2t";
import { useDispatch } from "react-redux";
import { userAction } from "../../../redux/actions/user";
import BookingHistoryCustomer from "../components/BookingHistoryCustomer.tsx";

export default function PersonalPage() {
    const { menu } = useParams();
    const navigate = useNavigate();
    const {user} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch();
    const [MenuComponent, setMenuComponent] = useState<ComponentType>(() => ProfileCustomer);
    const [nameOptionSelected, setNameOptionSelected] = useState('update profile')

    const handleUploadImages = (images : Array<string | ArrayBuffer | null>) => {
        const link_avatar = (images[0] + '').replace('data:', '').replace(/^.+,/, '')
        dispatch(userAction.updateUser({ link_avatar } as any) as any)
    }

    useEffect(() => {
        switch (menu) {
            case 'profile':
                setMenuComponent(() => ProfileCustomer);
                setNameOptionSelected("update profile");
                break;
            case 'password':
                setMenuComponent(() => ChangePasswordCustomer);
                setNameOptionSelected("change password");
                break;
            case 'booking-history':
                setMenuComponent(() => BookingHistoryCustomer);
                setNameOptionSelected("change password");
                break;
            default:
                setMenuComponent(() => <></>)
                break;
        }
    },[menu])

    return (
        <div className="bl_personalPage">
            <div className="bl_personalPage_banner">
                <div className="bl_banner_infor">
                    <div className="bl_infor_name">
                        {`Hello, ${user.firstname} ${user.surname}`}
                    </div>
                    <div className="bl_infor_optionSelect">{nameOptionSelected}</div>
                </div>
            </div>
            <div className="bl_personalPage_inner un_paddingDefault">
                <div className="bl_personalPage_left un_personalPage_grid">
                    <div className="bl_sidebar_commonInfor">
                        <Avatar
                            className='bl_commonInfor_avatar'
                            src={user.link_avatar} 
                        />
                        <div className="bl_commonInfor_fullName">
                            {`${user.firstname} ${user.surname}`}
                        </div>
                        <div className="bl_commonInfor_btnUpload">
                            <UploadFileBtnHk2t
                                onUploadImages={handleUploadImages}
                            />
                        </div>
                    </div>
                    <div className="bl_sidebar_options">
                        <div 
                            className="bl_option"
                            onClick={() => navigate('/customer/profile')}
                        >
                            <PersonOutline/>
                            profile
                        </div>
                        <div 
                            className="bl_option"
                            onClick={() => navigate('/customer/booking-history')}
                        >
                            <HistoryOutlined/>
                            booking history
                        </div>
                        <div 
                            className="bl_option"
                            onClick={() => navigate('/customer/password')}
                        >
                            <LockOutlined/>
                            change password
                        </div>
                    </div>
                </div>
                <div className="bl_personalPage_right un_personalPage_grid">
                    <MenuComponent/>
                </div>
            </div>
        </div>

    )
}
