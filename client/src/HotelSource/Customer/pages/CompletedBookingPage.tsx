import { useNavigate } from "react-router-dom";
import ButtonHk2t from "../../../common/ButtonHk2t";
import LockIcon from '@mui/icons-material/Lock';
import { useLoadingHk2tScreen } from "../../../common/Loading/LoadingHk2tScreen";
import GateWay from "../../../lib/api_gateway";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {toast} from "react-toastify";
import {MESSAGE} from "../../../utils/messages.ts";
import {toastMSGObject} from "../../../utils";
import PaymentDepositBooking from "../components/PaymentDepositBooking.tsx";

export default function CompletedBookingPage() {
    const loading = useLoadingHk2tScreen();
    //redux
    const { user, formBooking } = useSelector<RootState , RootState>(state => state);

    //navigate
    const navigate = useNavigate()
    const handleBackStep = () => {
        navigate('/reservation/person-infor')
    }

    const handleCompleteBooking = async () => {
        loading.show();
        const payload = {
            user_id :user.id,
            checkin_at : new Date(formBooking.checkin_at).toISOString(),
            checkout_at : new Date(formBooking.checkout_at).toISOString(),
            adult_number : formBooking.adult_number,
            kid_number : formBooking.kid_number,
            type_room_id : Number(formBooking.type_room_id),
            total_price : formBooking.total_price
        }
        const gateway = new GateWay('user' , user.token)
        const response = await gateway.post({action : 'create-re'} , payload);
        if (response.status === 200) {
            toast.success(MESSAGE.REVERSATION.CREATE.SUCCESS, toastMSGObject());
            navigate('/')
        } else {
            toast.error(MESSAGE.REVERSATION.NO_AVAILABLE_ROOM, toastMSGObject());
        }
        loading.hide();
    }

    return (
        <div className="bl_grid_column">
            <PaymentDepositBooking total_price={formBooking.total_price} />
            <div className="bl_infor_common">
                <div className="bl_note_sub">
                    By subscribing to email marketing, you allow us to
                    recommend products, services, offers and content based on your
                    interests by tracking how you use Booking.com through
                    tracking technology. Unsubscribe at any time.
                </div>
                <div className="bl_note_main">
                    Your booking is a direct booking with Hotel HK2T and
                    by completing this booking
                </div>
            </div>
            <div className="bl_btns_wrap">
                <ButtonHk2t
                    id="btn-check-again"
                    content="Check booking again"
                    className="bl_btn_act"
                    variant="outlined"
                    onClick={handleBackStep}
                />
                <ButtonHk2t
                    id="btn-complete-booking"
                    content="Complete Booking"
                    className="bl_btn_act"
                    startIcon={<LockIcon/>}
                    onClick={handleCompleteBooking}
                />
            </div>
        </div>
    )
}
