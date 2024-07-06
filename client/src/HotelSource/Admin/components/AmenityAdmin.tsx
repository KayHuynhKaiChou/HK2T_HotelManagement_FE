import { useSelector } from "react-redux";
import { Amenity } from "../../../types/models";
import FormAmenity from "./FormAmenity";
import { RootState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { amenityAction } from "../../../redux/actions/amenity";
import { useMemo } from "react";
import { ColumnType } from "../../../types/supportUI";
import { capitalizeFirstLetter, uuid } from "../../../utils";
import { Grid, Switch } from "@mui/material";
import ButtonHk2t from "../../../common/ButtonHk2t";
import { Delete, Edit } from "@mui/icons-material";
import { colorsBtnCustom, defaultPageSizeOptions, defaultTypeAmenity } from "../../../utils/constants";
import TableHk2t from "../../../common/Table/TableHk2t";

export default function AmenityAdmin() {
    //redux
    const {amenities} = useSelector<RootState , RootState>(state => state);
    const dispatch = useDispatch();

    const handleActionProfile = (formAmenity : Amenity) => {
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
            },
            {
                id : `field-action-${uuid()}`,
                nameCol : 'action',
                width : 300,
                textAlign : 'center'
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
                status : <Switch defaultChecked={!!ame.status} />,
                action : (
                    <Grid container spacing={2} width={100}>
                        <Grid item sm={6}>
                            <ButtonHk2t
                            typeCustom="icon"
                            Icon={Edit}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <ButtonHk2t
                            typeCustom="icon"
                            Icon={Delete}
                            colorCustom={colorsBtnCustom['danger']}
                            />
                        </Grid>
                    </Grid>
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
                    <FormAmenity onActionProfile={handleActionProfile} />
                </div>
            </div>
        </>
    )
}
