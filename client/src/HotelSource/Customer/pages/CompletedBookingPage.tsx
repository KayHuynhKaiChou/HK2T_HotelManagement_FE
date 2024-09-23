import { useNavigate } from "react-router-dom";
import ButtonHk2t from "../../../common/ButtonHk2t";
import LockIcon from '@mui/icons-material/Lock';

export default function CompletedBookingPage() {

    //navigate
    const navigate = useNavigate()
    const handleBackStep = () => {
        navigate('/reservation/person-infor')
    }

    const handleCompleteBooking = () => {
        navigate('')
    }

    return (
        <div className="bl_grid_column">
            <div className='bl_infor_common'>
                <div className="bl_notPayment_wrap">
                    <div className="bl_notPayment_ttl">
                        <h3>No payment information required</h3>
                        <p>Your payment will be processed by Lotus Laverne Hotel, 
                            so you do not need to enter payment information for this order.</p>
                    </div>
                    <div className="bl_notPayment_img">
                        <img 
                            src="https://cf.bstatic.com/static/img/book/bp-no-payment-last-minute/91d509cff564c4644361f56c4b4b00d1cc9b4609.png" 
                            alt=""
                        />
                    </div>
                </div>
            </div>
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
