import { Grid } from "@mui/material";
import InputHk2t from "../../../common/InputHk2t";
import { Room, TypeRoom } from "../../../types/models";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm, UseFormReturn, useWatch } from "react-hook-form";
import ButtonHk2t from "../../../common/ButtonHk2t";
import { ActionForm, FormRoomPayload } from "../../../types/form";
import { forwardRef, useImperativeHandle } from "react";
import RadioBtnHk2t from "../../../common/RadioBtnHk2t/RadioBtnHk2t";
import { uuid } from "../../../utils";
import SelectHk2t from "../../../common/SelectHk2t";
import { defaultstatus } from "../../../utils/constants";

interface FormRoomProps {
    typeActionFormRoom : ActionForm;
    listRooms : Room[];
    typeRooms : TypeRoom[];
    selectedRoom ?: FormRoomPayload;
    onActionRoom : (values : FormRoomPayload) => void;
}

export interface FormRoomHandle {
    form : UseFormReturn<FormRoomPayload>;
}

const FormRoom = forwardRef<FormRoomHandle , FormRoomProps>((props , ref) => {
    const { 
        typeActionFormRoom, 
        listRooms,
        typeRooms, 
        selectedRoom, 
        onActionRoom 
    } = props;

    const schema = yup.object({
        type_room: yup.object().shape({
            label: yup.string(),
            value: yup.number()
        }).required('Please select district !'),
        room_number: yup.string()
                .required('Please enter room number !')
                .test(
                    'unique-room-number',
                    'Room number already exists!',
                    (value) => {
                        if (typeActionFormRoom === 'UPDATE') {
                            return value === selectedRoom?.room_number || !listRooms.some(room => room.room_number.toLowerCase() === value.toLowerCase())
                        }
                        return !listRooms.some(room => room.room_number.toLowerCase() === value.toLowerCase())
                    }
                ),
        floor:  yup.number()
                .oneOf([1,2,3] as const)
                .required(),
        status: yup.number()
                .required()
    });

    // hook form
    const form : UseFormReturn<FormRoomPayload> = useForm({
        defaultValues: {
            type_room : selectedRoom ? {
                ...selectedRoom.type_room as any
            } : {
                label: typeRooms[0].title,
                value: typeRooms[0].id || 0
            },
            room_number : selectedRoom ? selectedRoom.room_number : '',
            floor : selectedRoom ? selectedRoom.floor : 1,
            status : selectedRoom ? selectedRoom.status : 1
        },
        resolver: yupResolver(schema)
    }) as any

    // useImperativeHandle hook
    useImperativeHandle(ref , () => ({ form }))

    //useWatch
    const selectedFloor = useWatch({ control: form.control, name: "floor"});
    const selectedStatus = useWatch({ control: form.control, name: "status"});
    
    return (
        <form 
            onSubmit={form.handleSubmit(onActionRoom as SubmitHandler<FormRoomPayload>)}
            className='bl_formRoom'
        >
            <div className="bl_formRoom_inner">
                <Grid container columnSpacing={3}>
                    <Grid item sm={6}>
                        <InputHk2t 
                            label='room number' 
                            name='room_number' 
                            placeholder='room number (ex: A1, B2, ...)' 
                            form={form} 
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <Grid
                            sx={{
                                color : "#707e9c;" , 
                                fontWeight : "bold",
                                marginLeft: "8px"
                            }}
                        >
                            Floor
                        </Grid>
                        <Grid container columnSpacing={3}>
                            <Grid container columnSpacing={3} sx={{margin : "16px 0 8px 0"}}>
                                {[1,2,3].map(floor => (
                                    <Grid item>
                                        <RadioBtnHk2t
                                            id={`select-floor-${uuid()}`}
                                            name="floor"
                                            label={floor + ''}
                                            value={floor}
                                            checked={selectedFloor == floor}
                                            form={form}
                                            onChange={() => form.setValue('floor', floor)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container columnSpacing={3}>
                    <Grid item sm={6}>
                        <SelectHk2t
                            form={form}
                            options={typeRooms.map(tr => ({ label: tr.title, value: tr.id || 0 }))}
                            label='type room'
                            name='type_room'
                            placeholder='select type room'
                            maxMenuHeight={120}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <Grid
                            sx={{
                                color : "#707e9c;" , 
                                fontWeight : "bold",
                                marginLeft: "8px"
                            }}
                        >
                            Status
                        </Grid>
                        <Grid container columnSpacing={3}>
                            <Grid container columnSpacing={3} sx={{margin : "16px 0 8px 0"}}>
                                {defaultstatus.map((status , index) => (
                                    <Grid item>
                                        <RadioBtnHk2t
                                            id={`select-status-${uuid()}`}
                                            name="status"
                                            label={status}
                                            value={index}
                                            checked={selectedStatus == index}
                                            form={form}
                                            onChange={() => form.setValue("status", index)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="bl_btn__submit">
                <ButtonHk2t
                    variant="contained"
                    content={`${typeActionFormRoom} room`}
                    isUseForm={true}
                /> 
            </div>
        </form>
    )
})

export default FormRoom
