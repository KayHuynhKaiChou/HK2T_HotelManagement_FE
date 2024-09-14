import { useMemo } from "react"
import { TypeRoom } from "../../../types/models"
import { linkDefaultImage } from "../../../utils/constants"
import CarouselHk2t from "../../../common/Carousel/CarouselHk2t"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface TypeRoomInforCommonCustomerProps {
    typeRoom: TypeRoom
}
export default function TypeRoomInforCommonCustomer({
  typeRoom
} : TypeRoomInforCommonCustomerProps) {

  const { images, title, adult_capacity, kids_capacity, size } = typeRoom

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
          <div className="bl_detail">
            <b>xem chi tiết</b>
            <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
