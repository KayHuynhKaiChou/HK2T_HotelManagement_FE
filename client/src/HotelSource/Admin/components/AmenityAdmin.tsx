import { useSelector } from "react-redux";
import { Amenity } from "../../../types/models";
import FormAmenity from "./FormAmenity";
import { RootState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { amenityAction } from "../../../redux/actions/amenity";
import { useMemo, useState } from "react";
import { ColumnType } from "../../../types/supportUI";
import { capitalizeFirstLetter, uuid } from "../../../utils";
import { Chip } from "@mui/material";
import ButtonHk2t from "../../../common/ButtonHk2t";
import { Edit } from "@mui/icons-material";
import { defaultPageSizeOptions, defaultstatus, defaultTypeAmenity } from "../../../utils/constants";
import TableHk2t from "../../../common/Table/TableHk2t";

export default function AmenityAdmin() {
    //redux
    const {amenities} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch();

    const handleActionAmenity = (formAmenity : Amenity) => {
        dispatch(amenityAction.createNewAmenity(formAmenity) as any)
    }

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
                width : 750
            },
            {
                id : `field-type-${uuid()}`,
                nameCol : 'type',
                width : 150,
                textAlign : 'center'
            },
            {
                id : `field-status-${uuid()}`,
                nameCol : 'status',
                width : 80
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
                status : (
                    <Chip 
                      color={!!ame.status ? 'success' : 'error'} 
                      label={defaultstatus[ame.status]}
                    />
                )
            }
        })
    },[amenities])

    return (
        <>
            <TableHk2t
                isLoadingTable={false}
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
