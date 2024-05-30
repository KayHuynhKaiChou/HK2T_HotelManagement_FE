import { useSelector } from "react-redux"
import { RootState } from "../../../redux/reducers"
import { User } from "../../../types/models"
import { Avatar } from "@mui/material"
import PopoverHk2t, { PopoverHandle } from "../../../common/Popover/PopoverHk2t"
import { uuid } from "../../../utils"
import { useRef } from "react"
import { Person , Logout } from '@mui/icons-material';
import { useNavigate } from "react-router-dom"

interface propsPersonInforAdmin {
    isShowDropdown ?: boolean
}

export default function PersonInforAdmin({isShowDropdown = false} : propsPersonInforAdmin) {
    const user = useSelector<RootState, User>(state => state.user);
    const uidPopover = `popover-person-info-${uuid()}`;
    const popoverRef = useRef<PopoverHandle | null>(null);
    const classSizeAvatar = 'bl_sizeAvatar_' + (isShowDropdown ? 'default' : 'scale');
    const navigate = useNavigate();
    
    const handleShowPopover = (event: React.MouseEvent<HTMLElement>) => {
        isShowDropdown && popoverRef.current?.onOpen(event);
    }

    const handleRedirectProfilePage = () => {
        navigate('/admin/profile');
        popoverRef.current?.onClose();
    }

    return (
        <>
            <div 
                aria-describedby={uidPopover}
                className="bl_personInfor"
                onClick={handleShowPopover}
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
                        onClick={handleRedirectProfilePage}
                    >
                        <Person/>
                        <div className="bl_dropdown_item_ttl">profile</div>
                    </div>
                    <div className="bl_dropdown_item">
                        <Logout/>
                        <div className="bl_dropdown_item_ttl">logout</div>
                    </div>
                </div>
            </PopoverHk2t>
        </>
    )
}
