import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import CarouselHk2t from "../../../common/Carousel/CarouselHk2t";
import { useMemo } from "react";
import { defaultViewDirection } from "../../../utils/constants";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formBookingAction } from "../../../redux/actions/formBooking";
import { TypeRoom } from "../../../types/models";

export default function ListTypeRoomCustomer() {
    //redux
    const {typeRooms} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleNavigateToDetailTR = (typeRoom: TypeRoom) => {
        handleSelectTypeRoom(typeRoom.id)
        let titleURL = typeRoom.title.replace('Phòng','Room').toLowerCase().replaceAll(/\s+/g, '-');
        navigate(`/rooms/${titleURL}`,{ state: typeRoom })
    }

    const handleSelectTypeRoom = (idTypeRoom: TypeRoom['id']) => {
        dispatch(
          formBookingAction.updateFormBooking(
            "type_room_id",
            idTypeRoom || 0
          )
        )
    }

    const ListTypeRoom = useMemo(() => {
        return typeRooms.map(tRoom => (
            <div 
                className="bl_inforTypeRoom_wrap"
            >
                <div className="bl_inforTypeRoom">
                    <img src={tRoom.images[0]} alt="" />
                    <div className="bl_content">
                        <div className="bl_content_ttl">
                            {`${tRoom.title} (${defaultViewDirection[tRoom.view_direction - 1]?.toLowerCase()} direction)`}
                        </div>
                        <div className="bl_content_wrap">
                            <div className="bl_content_main">
                                <p>{`Quantity adult: ${tRoom.adult_capacity} customers`}</p>
                                <span>|</span>
                                <p>{`Quantity kids: ${tRoom.kids_capacity} customers`}</p>
                                <span>|</span>
                                <p>{`Size room: ${tRoom.size} ㎡`}</p>
                            </div>
                            <div 
                                className="bl_detail"
                                onClick={() => handleNavigateToDetailTR(tRoom)}
                            >
                                <b>xem chi tiết</b>
                                <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    },[typeRooms])

    return (
        <div className="bl_sliderTypeRooms_wrap">
            <CarouselHk2t
                children={ListTypeRoom}
            />
        </div>
    )
}
