import ButtonHk2t from "../../../common/ButtonHk2t";
import ReceptionistSvg from "../../../common/Icon/ReceptionistSvg";
import PaymentCardSvg from "../../../common/Icon/PaymentCardSvg";
import CheckedSuccessSvg from "../../../common/Icon/CheckedSuccessSvg";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { useNavigate } from "react-router-dom";

export default function InforCustomerPage() {
    //redux
    const { user, formBooking, typeRooms } = useSelector<RootState , RootState>(state => state);

    //navigate
    const navigate = useNavigate()
    const handleNextStep = () => {
        navigate('/reservation/payment')
    }

    return (
        <div className="bl_grid_column">
            <div className="bl_infor_common">
                <div className="bl_avatar_wrap">
                    <Avatar src={user.link_avatar} />
                    <div className="bl_email_wrap">
                        <div className="bl_notification">You are logged in</div>
                        <div className="bl_email">lekimtan183@gmail.com</div>
                    </div>
                </div>
            </div>
            <div className="bl_infor_common">
                <h3 className="bl_ttl">Your detail information</h3>
                <div className="bl_entity_infor">
                    <div className="bl_infor_name">Firstname</div>
                    <div className="bl_infor_value">Kay</div>
                </div>
                <div className="bl_entity_infor">
                    <div className="bl_infor_name">Surname</div>
                    <div className="bl_infor_value">Kay</div>
                </div>
                <div className="bl_entity_infor">
                    <div className="bl_infor_name">Email</div>
                    <div className="bl_infor_value">Kay</div>
                </div>
                <div className="bl_entity_infor">
                    <div className="bl_infor_name">Phone</div>
                    <div className="bl_infor_value">Kay</div>
                </div>
            </div>
            <div className="bl_infor_common">
                <h3 className="bl_ttl">Tips</h3>
                <div className="bl_tip_content">
                    <PaymentCardSvg />
                    <p>No credit card required.</p>
                </div>
                <div className="bl_tip_content">
                    <CheckedSuccessSvg />
                    <p>
                        Flexible: You can cancel for free until 6:00 PM, September 27,
                        2024, so lock in a great rate today.
                    </p>
                </div>
                <div className="bl_tip_content">
                    <CheckedSuccessSvg />
                    <p>No payment today. You will pay during your break.</p>
                </div>
            </div>
            <div className="bl_infor_common">
                <h3 className="bl_ttl">Phòng Gia Đình</h3>
                <div className="bl_entity_infor">
                    <div className="bl_infor_name">Free cancel</div>
                    <div className="bl_infor_value">trước 18:00, 27 tháng 9, 2024</div>
                </div>
                <div className="bl_entity_infor">
                    <div className="bl_infor_name">view direction</div>
                    <div className="bl_infor_value">Kay</div>
                </div>
                <div className="bl_entity_infor">
                    <div className="bl_infor_name">size</div>
                    <div className="bl_infor_value">Kay</div>
                </div>
                <div className="bl_entity_infor">
                    <div className="bl_infor_name">customers</div>
                    <div className="bl_infor_value">Kay</div>
                </div>
                <div className="bl_entity_infor">
                    <div className="bl_infor_name">amenities</div>
                    <div className="bl_infor_value">Kay</div>
                </div>
            </div>
            <div className="bl_infor_common">
                <h3 className="bl_ttl">Your time to</h3>
                <div className="bl_tip_content">
                    <CheckedSuccessSvg />
                    <p>Your room will be ready for check in between 14:00 and 23:00.</p>
                </div>
                <div className="bl_tip_content">
                    <ReceptionistSvg />
                    <p>
                        24 Hour Reception - Help is always available whenever you need it!
                    </p>
                </div>
            </div>
            <div className="bl_btn_next">
                <ButtonHk2t
                    id="btn-next-step"
                    content="Next step: last step"
                    onClick={handleNextStep}
                    endIcon={<KeyboardArrowRightIcon/>}
                />
            </div>
        </div>
    );
}
