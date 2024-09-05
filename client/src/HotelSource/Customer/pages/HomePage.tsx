import { useDispatch } from "react-redux";
import BannerCustomer from "../components/BannerCustomer";
import IntroduceHotel from "../components/IntroduceHotel";
import ListTypeRoomCustomer from "../components/ListTypeRoomCustomer";
import Navbar from "../components/NavbarCustomer";
import { useEffect } from "react";
import { typeRoomAction } from "../../../redux/actions/typeRoom";
import { anotherPartServices } from "../../../utils/constants";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(typeRoomAction.showAllTypeRoom() as any)
  },[])

  return (
    <div>
      <Navbar />
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
    </div>
  )
}
