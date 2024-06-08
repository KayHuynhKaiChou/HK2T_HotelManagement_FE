import { Amenity } from "../../../types/models";
import FormAmenity from "./FormAmenity";

export default function AmenityAdmin() {

    const handleActionProfile = (formAmenity : Amenity) => {

    }

    return (
        <div className="bl_profile">
            <div className="bl_profile_inner">
                <FormAmenity onActionProfile={handleActionProfile} />
            </div>
        </div>
    )
}
