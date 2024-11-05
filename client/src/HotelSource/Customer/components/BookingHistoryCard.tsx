import {Reversation} from "../../../types/models.ts";
import ButtonHk2t from "../../../common/ButtonHk2t.tsx";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Chip} from "@mui/material";
import {statusBooking} from "../../../utils/constants.ts";
import {useMemo} from "react";
import {formatDateV1} from "../../../utils";

interface BookingHistoryCardProps {
    reservation : Reversation;
    onClickView : () => void;
}

function BookingHistoryCard({ reservation, onClickView }: BookingHistoryCardProps): JSX.Element {

    const dateBooking = useMemo(() => {
        return `${formatDateV1(new Date(reservation.checkin_at))} - ${formatDateV1(new Date(reservation.checkout_at))}`
    },[
        reservation.checkin_at,
        reservation.checkout_at
    ])

    return (
        <div className="bl_bookingHistory_wrap">
            <img src={reservation.room.type_room.images[0]} alt={''}/>
            <div className="bl_commonContent_wrap">
                <div className="bl_trName">{reservation.room.type_room.title}</div>
                <div className="bl_dateBooking">{dateBooking}</div>
                <div className="bl_numberPerson"></div>
                <Chip
                    className='bl_status'
                    label={statusBooking[reservation.status - 1].name}
                    style={{
                        background: statusBooking[reservation.status - 1].color
                    }}
                />
            </div>
            <ButtonHk2t
                onClick={onClickView}
                className='bl_btn_view'
                content='view'
                endIcon={<VisibilityIcon/>}
            />
        </div>
    );
}

export default BookingHistoryCard;