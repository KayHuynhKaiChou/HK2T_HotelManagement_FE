import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/reducers"
import { User } from "../../types/models"
import { Avatar } from "@mui/material"
import PopoverHk2t, { PopoverHandle } from "../Popover/PopoverHk2t"
import { uuid } from "../../utils"
import { useRef } from "react"
import { Person , Logout , History } from '@mui/icons-material';
import { useNavigate } from "react-router-dom"
import { persistor } from "../../redux/store"
import {POSITION} from "../../types/enum.ts";
import { userAction } from "../../redux/actions/user.ts"

interface propsSummaryInfor {
    isShowDropdown ?: boolean;
    position ?: 'CUSTOMER' | 'ADMIN';
}

export default function SummaryInfor({isShowDropdown = false , position = 'ADMIN'} : propsSummaryInfor) {
    const user = useSelector<RootState, User>(state => state.user);
    const dispatch = useDispatch();
    const uidPopover = `popover-person-info-${uuid()}`;
    const popoverRef = useRef<PopoverHandle | null>(null);
    const classSizeAvatar = 'bl_sizeAvatar_' + (isShowDropdown ? 'default' : 'scale');
    const navigate = useNavigate();
    
    const handleShowPopover = (event: React.MouseEvent<HTMLElement>) => {
        isShowDropdown && popoverRef.current?.onOpen(event);
    }

    const handleRedirectProfilePage = (linkRedirect: string) => {
        if (linkRedirect === 'profile') {
            navigate(position == 'ADMIN' ? '/admin/profile' : '/customer/profile');

        } else {
            navigate('/customer/booking-history');
        }
        popoverRef.current?.onClose();
    }

    const handleLogout = async () => {
        await persistor.purge();
        // Reset the user state in Redux
        dispatch(userAction.reserInforUser() as any);
        let linkPage = user.position === POSITION.CUSTOMER ? '/' : '/admin'
        navigate(linkPage)
    }

    return (
        <>
            <div 
                aria-describedby={uidPopover}
                className="bl_personInfor"
                onClick={handleShowPopover}
                style={{cursor : isShowDropdown ? 'pointer' : 'none'}}
            >
                <div className="bl_personInfor_inner">
                    <Avatar 
                        className={`bl_personInfor_avatar ${classSizeAvatar}`}
                        src={user.link_avatar} 
                    />
                    <div className="bl_personInfor_fullName">
                        {!isShowDropdown && <p>Chào mừng,</p>}
                        {`${user.firstname} ${user.surname}`}
                    </div>
                </div>
            </div>
            <PopoverHk2t
                id={uidPopover}
                ref={popoverRef}
            >
                <div className="bl_dropdown_inner">
                    <div 
                        className="bl_dropdown_item"
                        onClick={() => handleRedirectProfilePage('profile')}
                    >
                        <Person/>
                        <div className="bl_dropdown_item_ttl">profile</div>
                    </div>
                    {user.position == POSITION.CUSTOMER && (
                        <div 
                            className="bl_dropdown_item"
                            onClick={() => handleRedirectProfilePage('booking-history')}
                        >
                            <History/>
                            <div className="bl_dropdown_item_ttl">booking history</div>
                        </div>
                    )}
                    <div className="bl_dropdown_item" onClick={handleLogout}>
                        <Logout/>
                        <div className="bl_dropdown_item_ttl">
                            logout
                        </div>
                    </div>
                </div>
            </PopoverHk2t>
        </>
    )
}
