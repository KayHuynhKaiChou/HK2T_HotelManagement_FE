import RatingHk2t from "../../../common/Rating/RatingHk2t.tsx";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import {Chip, Divider} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {distanceTwoDate, formatCurrency, formatDateV2} from "../../../utils";
import {useMemo} from "react";
import {FormBookingCustomer} from "../../../types/form.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {statusBooking} from "../../../utils/constants.ts";

interface ReservationInforCommonProps extends Pick<FormBookingCustomer, 'checkin_at' | 'checkout_at' | 'type_room_id' | 'total_price'> {
    status?: number
}

const ReservationInforCommon = ({
    checkin_at,
    checkout_at,
    type_room_id,
    total_price,
    status
}: ReservationInforCommonProps) => {
    const { typeRooms } = useSelector<RootState , RootState>(state => state);

    const checkinFormat = useMemo(() => {
        const checkinDate = new Date(checkin_at)
        return formatDateV2(checkinDate)
    }, [checkin_at])

    const checkoutFormat = useMemo(() => {
        const checkoutDate = new Date(checkout_at)
        return formatDateV2(checkoutDate)
    }, [checkout_at])

    const checkinCountdown = useMemo(() => {
        const today = new Date().toDateString()
        return distanceTwoDate(today, checkin_at) - 1
    }, [checkin_at])

    const numberOfNight = useMemo(() => {
        // from 22/8 to 23/8 is 2 date => 1 đêm
        return distanceTwoDate(
            checkin_at,
            checkout_at
        ) - 1
    }, [
        checkin_at,
        checkout_at
    ])

    const selectedTypeRoom = useMemo(() => {
        return typeRooms.find(typeRoom => typeRoom.id === type_room_id)
    }, [type_room_id])

    const costCancel = useMemo(() => {
        if (selectedTypeRoom) {
            return Number(total_price) - Number(total_price) * 0.5
        }
        return 0
    }, [selectedTypeRoom])

    return (
        <>
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
                {!status && (
                    <div className="bl_periodTime">
                        <InfoIcon/>
                        {checkinCountdown === 0 ? 'Là ngày hôm nay!' : `Chỉ còn ${checkinCountdown} ngày nữa!`}
                    </div>
                )}
                <div className="bl_totalTime">
                    <div>Total length of stay:</div>
                    <b>{`${numberOfNight} night${numberOfNight > 1 ? 's' : ''}`}</b>
                </div>
                {status && (
                    <div className="bl_status">
                        <div>Status:</div>
                        <Chip
                            label={statusBooking[status - 1].name}
                            style={{
                                background: statusBooking[status - 1].color,
                                color: '#fff'
                            }}
                        />
                    </div>
                )}
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
                    <div className="bl_total_value">VND {formatCurrency(total_price)}</div>
                </div>
            </div>
            <div className="bl_infor_common">
                <b>Your payment schedule</b>
                <div className="bl_note">
                    You pay a deposit of 50% of the total booking price.
                    You will pay the remaining 50% when you arrive at the reception.
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
                <i>Note: Cancel cost is your deposit before</i>
            </div>
        </>
    );
};

export default ReservationInforCommon;