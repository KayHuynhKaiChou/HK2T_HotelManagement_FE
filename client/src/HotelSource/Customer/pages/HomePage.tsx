import {useDispatch, useSelector} from "react-redux";
import BannerCustomer from "../components/BannerCustomer";
import IntroduceHotel from "../components/IntroduceHotel";
import ListTypeRoomCustomer from "../components/ListTypeRoomCustomer";
import {useEffect} from "react";
import { typeRoomAction } from "../../../redux/actions/typeRoom";
import { anotherPartServices } from "../../../utils/constants";
import RegisterMemberCustomer from "../components/RegisterMemberCustomer";
import { amenityAction } from "../../../redux/actions/amenity";
import { userAction } from "../../../redux/actions/user";
import dayjs from "dayjs";
import {formBookingAction} from "../../../redux/actions/formBooking.ts";
import {RootState} from "../../../redux/reducers";

export default function HomePage() {
  const dispatch = useDispatch();
  const {formBooking} = useSelector<RootState, RootState>(state => state);

  useEffect(() => {
    dispatch(userAction.showInforUser() as any)
    dispatch(typeRoomAction.showAllTypeRoom() as any)
    dispatch(amenityAction.showAllAmenity() as any)
  },[])

    useEffect(() => {
        // handle case reset checkin and checkout
        if (dayjs(formBooking.checkin_at).isBefore(dayjs(), 'day')) { // check ngày checkin với ngày hôm nay
            dispatch(
                formBookingAction.updateFormBooking("checkin_at", dayjs().format('YYYY-MM-DD'))
            )
            dispatch(
                formBookingAction.updateFormBooking("checkout_at", dayjs().add(1, 'day').format('YYYY-MM-DD'))
            )
        }
    }, [])

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
