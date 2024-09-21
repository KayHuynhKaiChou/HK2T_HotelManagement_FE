import { useMemo } from "react"
import { TypeRoom } from "../../../types/models"
import { colorsBtnCustom, linkDefaultImage } from "../../../utils/constants"
import CarouselHk2t from "../../../common/Carousel/CarouselHk2t"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";
import ButtonHk2t from "../../../common/ButtonHk2t";
import { useDispatch } from "react-redux";
import { formBookingAction } from "../../../redux/actions/formBooking";

interface TypeRoomInforCommonCustomerProps {
  typeRoom: TypeRoom
}
export default function TypeRoomInforCommonCustomer({
  typeRoom
} : TypeRoomInforCommonCustomerProps) {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { id, images, title, adult_capacity, kids_capacity, size } = typeRoom

  const ListImages = useMemo(() => {
    if(images.length == 0) return (
        <div className="bl_img_wrap bl_img_default">
            <img src={linkDefaultImage} />
        </div>
    )
    return images.map(img => (
        <div className="bl_img_wrap">
            <img src={img.link} />
        </div>
    ))
  }, [images])

  const handleNavigateToDetailTR = () => {
    handleSelectTypeRoom()
    let titleURL = title.replace('Phòng','Room').toLowerCase().replaceAll(/\s+/g, '-');
    navigate(`/rooms/${titleURL}`,{ state: typeRoom })
  }

  const handleSelectTypeRoom = () => {
    dispatch(
      formBookingAction.updateFormBooking(
        "type_room_id",
        id || 0
      )
    )
  }

  return (
    <div className="bl_tr_wrap">
      <div className="bl_carousel_wrap">
        <CarouselHk2t
          children={ListImages}
        />
      </div>
      <div className="bl_content_wrap">
        <div className="bl_content_ttl">{title}</div>
        <div className="bl_content_common">
          <div className="bl_content_main">
            <p>Quantity adult: <b>{adult_capacity} customers</b></p>
            <span>|</span>
            <p>Quantity kids: <b>{kids_capacity} customers</b></p>
            <span>|</span>
            <p>Size room: <b>{size} ㎡</b></p>
          </div>
          <div 
            className="bl_detail"
            onClick={handleNavigateToDetailTR}
          >
            <b>xem chi tiết</b>
            <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
          </div>
        </div>
        <div className="bl_content_action">
          <ButtonHk2t
            onClick={handleSelectTypeRoom}
            colorCustom={colorsBtnCustom['dark']}
            content="Select type room"
          />
        </div>
      </div>
    </div>
  )
}
