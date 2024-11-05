import { useSelector } from "react-redux";
import FormAmenity from "./FormAmenity";
import { RootState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { amenityAction } from "../../../redux/actions/amenity";
import { useMemo } from "react";
import { ColumnType } from "../../../types/supportUI";
import { capitalizeFirstLetter, toastMSGObject, uuid } from "../../../utils";
import { Chip } from "@mui/material";
import { toast } from "react-toastify";
import { defaultPageSizeOptions, defaultstatus, defaultTypeAmenity } from "../../../utils/constants";
import TableHk2t from "../../../common/Table/TableHk2t";
import useEffectSkipFirstRender from "../../../hooks/useEffectSkipFirstRender";
import { useLoadingHk2tScreen } from "../../../common/Loading/LoadingHk2tScreen";
import { MESSAGE } from "../../../utils/messages";
import { FormAmenityPayload } from "../../../types/form";

export default function AmenityAdmin() {
    //redux
    const {amenities, response} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch();

    // common context
    const loading = useLoadingHk2tScreen();

    const handleActionAmenity = (formAmenity : FormAmenityPayload) => {
        loading.show()
        const formatFormAmenity = {
            ...formAmenity,
            type: Number(formAmenity.type.value)
        }
        dispatch(amenityAction.createNewAmenity(formatFormAmenity) as any)
    }

    useEffectSkipFirstRender(() => {
        if (response.status === 200) {
            toast.success(MESSAGE.AMENITY.CREATE.SUCCESS, toastMSGObject());
        } else {
            toast.error(MESSAGE.AMENITY.CREATE.FAIL, toastMSGObject())
        }
        loading.hide()
    },[amenities, response.status])

    // define columns and rows
    const columns = useMemo<ColumnType[]>(() => {
        return [
            {
                id : `field-stt-${uuid()}`,
                nameCol : 'stt',
                width : 20,
                textAlign : 'center'
            },
            {
                id : `field-name-${uuid()}`,
                nameCol : 'name',
                isSearched : true,
                width : 750
            },
            {
                id : `field-type-${uuid()}`,
                nameCol : 'type',
                isSearched : true,
                criteria : defaultTypeAmenity.map(typeAme => ({
                    label: typeAme,
                    condition: typeAme
                })),
                width : 150,
                textAlign : 'center'
            },
            {
                id : `field-status-${uuid()}`,
                nameCol : 'status',
                width : 80,
                render : (value) => (
                    <Chip 
                      color={!!value ? 'success' : 'error'} 
                      label={defaultstatus[value]}
                    />
                )
            }
        ]
    },[])

    const rows = useMemo(() => {
        if(!amenities) return [];
        return amenities
        .map((ame , index) => {
            return {
                id : ame.id,
                stt : index + 1,
                name : capitalizeFirstLetter(ame.name),
                type : defaultTypeAmenity[ame.type - 1],     
                status : ame.status
            }
        })
    },[amenities])

    return (
        <>
            <TableHk2t
                columns={columns}
                rows={rows}
                pageSizeOptions={defaultPageSizeOptions}
            />
            <div className="un_padding_updown_12"></div>
            <div className="bl_profile">
                <div className="bl_profile_inner">
                    <FormAmenity
                        onActionProfile={handleActionAmenity}
                    />
                </div>
            </div>
        </>
    )
}
