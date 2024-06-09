import { useSelector } from "react-redux";
import FormTypeRoom from "./FormTypeRoom";
import { RootState } from "../../../redux/reducers";

export default function TypeRoomAdmin() {
    const {user} = useSelector<RootState , RootState>(state => state);

    const handleActionTypeRoom = () => {

    }

    return (
        <div className="bl_profile">
            <div className="bl_profile_inner">
                <FormTypeRoom
                    user={user}
                    onActionTypeRoom={handleActionTypeRoom}
                />
            </div>
        </div>
    )
}
