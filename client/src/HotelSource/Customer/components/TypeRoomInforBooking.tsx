import {defaultTypeAmenity, defaultViewDirection} from "../../../utils/constants.ts";
import {convertAmenitiesArrayToObject, formatContentAmenitiesOfTypeAme, formatDateV2} from "../../../utils";
import {TypeAmenity, TypeRoom} from "../../../types/models.ts";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {FormBookingCustomer} from "../../../types/form.ts";

interface TypeRoomInforBookingProps extends Pick<FormBookingCustomer, 'checkin_at' | 'adult_number' | 'kid_number'> {
    typeRoom: TypeRoom
}

function TypeRoomInforBooking({
    typeRoom,
    kid_number,
    adult_number,
    checkin_at
} : TypeRoomInforBookingProps) {

    const { amenities } = useSelector<RootState , RootState>(state => state);

    const viewDirection = useMemo(() => {
        return typeRoom && defaultViewDirection[typeRoom.view_direction - 1]
    }, [typeRoom?.view_direction])

    const amenitiesObj = useMemo(() => {
        return convertAmenitiesArrayToObject(amenities)
    }, [amenities])

    const checkInMemo = useMemo(() => {
        return formatDateV2(new Date(checkin_at))
    }, [checkin_at])

    return (
        <div className="bl_infor_common">
            <h3 className="bl_ttl">{typeRoom?.title}</h3>
            <div className="bl_entity_infor">
                <div className="bl_infor_name">Free cancel</div>
                <div className="bl_infor_value">Before 18:00, {checkInMemo}</div>
            </div>
            <div className="bl_entity_infor">
                <div className="bl_infor_name">view direction</div>
                <div className="bl_infor_value">{viewDirection}</div>
            </div>
            <div className="bl_entity_infor">
                <div className="bl_infor_name">size</div>
                <div className="bl_infor_value">{typeRoom?.size} ㎡</div>
            </div>
            <div className="bl_entity_infor">
                <div className="bl_infor_name">customers</div>
                <div className="bl_infor_value">
                    {`${adult_number} adults, ${kid_number} kids`}
                </div>
            </div>
            <div className="bl_entity_infor">
                <div className="bl_infor_name">amenities</div>
                <div className="bl_infor_value">
                    {defaultTypeAmenity.map(typeAme => (
                        <div className="bl_ame_wrap">
                            <div className="bl_type_label">{`${typeAme.toLowerCase()}:`}</div>
                            <div className="bl_type_value">
                                {formatContentAmenitiesOfTypeAme(
                                    amenitiesObj[typeAme.toLowerCase() as TypeAmenity]
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TypeRoomInforBooking;