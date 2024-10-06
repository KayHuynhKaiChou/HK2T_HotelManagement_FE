import RatingHk2t from "../../../common/Rating/RatingHk2t";
import StepperHk2t from "../../../common/Stepper/StepperHk2t";
import { defaultSteps } from "../../../utils/constants";
import { Divider } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useMemo } from "react";
import { distanceTwoDate, formatCurrency, formatDateV2 } from "../../../utils";

export default function ReservationPage() {
    //redux
    const { user, formBooking, typeRooms } = useSelector<RootState , RootState>(state => state);

    const checkinFormat = useMemo(() => {
        const checkinDate = new Date(formBooking.checkin_at)
        return formatDateV2(checkinDate)
    }, [formBooking.checkin_at])

    const checkoutFormat = useMemo(() => {
        const checkoutDate = new Date(formBooking.checkout_at)
        return formatDateV2(checkoutDate)
    }, [formBooking.checkout_at])

    const checkinCountdown = useMemo(() => {
        const today = new Date().toDateString()
        return distanceTwoDate(today, formBooking.checkin_at)
    }, [formBooking.checkin_at])

    const numberOfNight = useMemo(() => {
        return distanceTwoDate(
            formBooking.checkin_at,
            formBooking.checkout_at
        ) - 1
    }, [
        formBooking.checkin_at,
        formBooking.checkout_at
    ])

    const selectedTypeRoom = useMemo(() => {
        return typeRooms.find(typeRoom => typeRoom.id === formBooking.type_room_id)
    }, [formBooking.type_room_id])

    const costCancel = useMemo(() => {
        if (selectedTypeRoom) {
            return Number(selectedTypeRoom.base_price) - Number(selectedTypeRoom.base_price) * 0.4
        }
        return 0
    }, [selectedTypeRoom])

    return (
        <div className="bl_ReservationPage_wrap">
            <div className="bl_stepper_wrap">
                <StepperHk2t
                    steps={defaultSteps}
                    activeStep={1}
                />
            </div>
            <div className="bl_reservation_grid">
                <div className="bl_grid_column">
                    <div className="bl_infor_common">
                        <div className="bl_ttl_wrap">
                            <div className="bl_main_ttl">
                                <p>Hotel</p>
                                <RatingHk2t 
                                    name="read-only"
                                    value={5} 
                                />
                            </div>
                            <b>Hotel HK2T</b>
                        </div>
                        <div className="bl_hotel_address">
                            50 Nguyen Hue street, Dong Da District, TP. Quy Nhon, Việt Nam
                        </div>
                        <div className="bl_service_wrap">
                            <div className="bl_service">
                                <WifiIcon fontSize="small"/>
                                Free WiFi
                            </div>
                            <div className="bl_service">
                                <LocalParkingIcon fontSize="small"/>
                                Parking
                            </div>
                        </div>
                    </div>
                    <div className="bl_infor_common">
                        <b>Your booking details</b>
                        <div className="bl_timeRoom_wrap">
                            <div className="bl_timeRoom">
                                <div className="bl_timeRoom_ttl">
                                    Check in
                                </div>
                                <b className="bl_timeRoom_date">
                                    {checkinFormat}
                                </b>
                                <div className="bl_timeRoom_hour un_font_blink">
                                    14:00 – 23:00
                                </div>
                            </div>
                            <Divider orientation="vertical" variant="middle" flexItem/>
                            <div className="bl_timeRoom">
                                <div className="bl_timeRoom_ttl">
                                    Check out
                                </div>
                                <b className="bl_timeRoom_date">
                                    {checkoutFormat}
                                </b>
                                <div className="bl_timeRoom_hour un_font_blink">
                                    14:00 – 23:00
                                </div>
                            </div>
                        </div>
                        <div className="bl_periodTime">
                            <InfoIcon />
                            {checkinCountdown === 0 ? 'Là ngày hôm nay!' : `Chỉ còn ${checkinCountdown} ngày nữa!`}
                        </div>
                        <div className="bl_totalTime">
                            Total length of stay:
                            <b>{`${numberOfNight} night${numberOfNight > 1 ? 's' : ''}`}</b>
                        </div>
                    </div>
                    <div className="bl_infor_common">
                        <b>Price summary</b>
                        <div className="bl_price_wrap">
                            <div className="bl_price_part">
                                <div className="bl_p_name">Base price</div>
                                <div className="bl_p_value">VND {formatCurrency(selectedTypeRoom?.base_price || 0)}</div>
                            </div>
                            <div className="bl_price_part">
                                <div className="bl_p_name">Number of night</div>
                                <div className="bl_p_value">{numberOfNight}</div>
                            </div>
                        </div>
                        <div className="bl_price_total">
                            <div className="bl_total_name">Total</div>
                            <div className="bl_total_value">VND {formatCurrency(formBooking.total_price)}</div>
                        </div>
                    </div>
                    <div className="bl_infor_common">
                        <b>Your payment schedule</b>
                        <div className="bl_note">
                            No payment required today. You will pay when you arrive.
                        </div>
                    </div>
                    <div className="bl_infor_common">
                        <b>How much does it cost to cancel ?</b>
                        <div className="bl_note">
                            Free cancellation before 6:00 PM, {checkinFormat.split(', ')[1]}
                        </div>
                        <div className="bl_after_dateStart">
                            <div className="bl_date">From 18:00, {checkinFormat.split(', ')[1]}</div>
                            <div className="bl_totalPrice">VND {formatCurrency(costCancel)}</div>
                        </div>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}
