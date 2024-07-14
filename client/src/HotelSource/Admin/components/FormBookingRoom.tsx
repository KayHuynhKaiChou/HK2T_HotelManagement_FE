import { Divider, Grid } from "@mui/material";
import InputHk2t from "../../../common/InputHk2t";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import RadioBtnHk2t from "../../../common/RadioBtnHk2t";
import { uuid } from "../../../utils";
import ButtonHk2t from "../../../common/ButtonHk2t";
import SelectHk2t from "../../../common/SelectHk2t";
import { FormBooking } from "../../../types/form";
import dayjs, { Dayjs } from "dayjs";

interface FormBookingRoomProps {
    onActionReversation : (values : FormBooking) => void;
}

type FormFieldsBooking = 'email' | 'checkin_at' | 'checkout_at' | 'adult_capacity' | 'kid_capacity' | 'type_room_id';

export default function FormBookingRoom({onActionReversation} : FormBookingRoomProps) {

    const schema = yup.object({
        email: yup.string()
                .required('Please enter email !'),
        checkin_at: yup.string()
                .required('Please enter check in !'),
        checkout_at: yup.string()
                .required('Please enter check out !'),
        adult_capacity: yup.number()
                .required('Please enter quantity adult !'),
        kid_capacity: yup.number()
                .required('Please enter quantity kids !'),
        type_room_id: yup.number() // ban đầu disable , khi chọn adult và kids sau sẽ filter ra list type room phù hợp
                .required('Please select type room !')
    });

    // hook form
    const form = useForm({
        defaultValues: {
            email : '',
            checkin_at : '',
            checkout_at : '',
            adult_capacity : 0,
            kid_capacity : 0,
            type_room_id : 0
        },
        resolver: yupResolver(schema)
    })

    const watchCheckIn = useWatch({ control : form.control , name: "checkin_at"});

    const handleChangeDatePicker = (name: FormFieldsBooking, value: Dayjs | null) => {
        form.setValue(name, value?.format('YYYY-MM-DD') || '')
    }
    
    return (
        <form 
            onSubmit={form.handleSubmit(onActionReversation as SubmitHandler<FormBooking>)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">Form Booking Room</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
                    <Grid container columnSpacing={3}>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='email' 
                                name='email' 
                                placeholder='email' 
                                form={form} 
                                disabled
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t
                                form={form} 
                                label='check in' 
                                name='checkin_at' 
                                typeInput='date' 
                                minDate={dayjs()}
                                onChangeDatePicker={(value: Dayjs | null) => handleChangeDatePicker("checkin_at", value)}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                form={form} 
                                label='check out' 
                                name='checkout_at' 
                                typeInput='date'
                                minDate={watchCheckIn ? dayjs(watchCheckIn).add(1, 'day') : dayjs()}
                                disabled={!watchCheckIn}
                                onChangeDatePicker={(value: Dayjs | null) => handleChangeDatePicker("checkout_at", value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3}>
                        <Grid item sm={4}>
                            <InputHk2t 
                                form={form} 
                                label='adult capacity' 
                                name='adult_capacity'
                                typeInput='number' 
                                placeholder='enter adult capacity' 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t
                                form={form} 
                                label='kids capacity' 
                                name='kids_capacity' 
                                typeInput='number'
                                placeholder='enter kids capacity' 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <SelectHk2t
                                options={[]} 
                                label='type room' 
                                name='type_room_id' 
                                placeholder='select type room' 
                                form={form}
                                disabled
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="bl_btn__submit for_employee">
                <ButtonHk2t
                    variant="contained"
                    content='Create type room'
                    isUseForm={true}
                /> 
            </div>
        </form>
    )
}
checkin_at: yup.string()
                .required('Please enter check in !')