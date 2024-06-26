import { Room } from "../../../types/models";
import FormRoom from "./FormRoom";

export default function RoomAdmin() {

    const handleActionProfile = (formRoom : Room) => {

    }

    return (
        <div className="bl_profile">
            <div className="bl_profile_inner">
                <FormRoom onActionProfile={handleActionProfile} />
            </div>
        </div>
    )
}
