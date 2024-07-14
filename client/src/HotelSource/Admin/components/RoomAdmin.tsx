import { FormBooking } from "../../../types/form";
import CalenderHotel from "./CalenderHotel";
import FormBookingRoom from "./FormBookingRoom";

export default function RoomAdmin() {

    const handleActionBookingRoom = (values : FormBooking) => {

    }

    return (
        <div className="bl_profile">
            <div className="bl_profile_inner">                
                <CalenderHotel/>
                <FormBookingRoom onActionReversation={handleActionBookingRoom}/>
            </div>
        </div>
    )
}
