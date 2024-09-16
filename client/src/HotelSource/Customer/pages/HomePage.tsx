import { useDispatch } from "react-redux";
import BannerCustomer from "../components/BannerCustomer";
import IntroduceHotel from "../components/IntroduceHotel";
import ListTypeRoomCustomer from "../components/ListTypeRoomCustomer";
import { useEffect } from "react";
import { typeRoomAction } from "../../../redux/actions/typeRoom";
import { anotherPartServices } from "../../../utils/constants";
import RegisterMemberCustomer from "../components/RegisterMemberCustomer";
import { amenityAction } from "../../../redux/actions/amenity";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(typeRoomAction.showAllTypeRoom() as any)
    dispatch(amenityAction.showAllAmenity() as any)
  },[])

  return (
    <div>
      <BannerCustomer/>
      <IntroduceHotel/>
      <div className="bl_mainInfor_wrap">
        <ListTypeRoomCustomer/>
        <div className="bl_introduceService">
          {anotherPartServices.map(partService => (
            <div 
              className="bl_introduceService_item"
            >
              <img src={partService.backgroundImg} alt={partService.title} />
              <h2>{partService.title}</h2>
            </div>
          ))}
        </div>
      </div>
      <RegisterMemberCustomer/>
    </div>
  )
}
