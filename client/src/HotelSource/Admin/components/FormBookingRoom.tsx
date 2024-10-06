import { Divider, Grid } from "@mui/material";
import InputHk2t from "../../../common/InputHk2t";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import ButtonHk2t from "../../../common/ButtonHk2t";
import SelectHk2t from "../../../common/SelectHk2t";
import { FormBooking } from "../../../types/form";
import dayjs, { Dayjs } from "dayjs";
import { TypeRoom, User } from "../../../types/models";
import { useMemo } from "react";
import { OptionSelect } from "../../../types/supportUI";
import useEffectSkipFirstRender from "../../../hooks/useEffectSkipFirstRender";
import { distanceTwoDate, formatCurrency } from "../../../utils";

interface FormBookingRoomProps {
    typeRooms : TypeRoom[];
    customers : User[];
    onActionReversation : (values : FormBooking) => void;
}

type FormFieldsBooking = 'email' | 'checkin_at' | 'checkout_at' | 'adult_capacity' | 'kid_capacity' | 'type_room';

export default function FormBookingRoom({
    typeRooms,
    customers,
    onActionReversation
} : FormBookingRoomProps) {

    const schema = yup.object({
        email: yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required()
        }).required('Please select email customer !'),
        checkin_at: yup.string()
                .required('Please choose check in !'),
        checkout_at: yup.string()
                .required('Please choose check out !'),
        adult_capacity: yup.number()
                .typeError('Please enter quantity adult !')
                .required('Please enter quantity adult !')
                .moreThan(0, 'Quantity adult must be greater than 0')
                .max(4, 'Max number of adult is 4'),
        kid_capacity: yup.number()
                .typeError('Please enter quantity kids !')
                .required('Please enter quantity kids !')
                .moreThan(0, 'Quantity kids must be greater than 0')
                .max(4, 'Max number of kids is 4'),
        type_room: yup.object().shape({ // ban đầu disable , khi chọn adult và kids sau sẽ filter ra list type room phù hợp        
            label: yup.string().required(),
            value: yup.string().required(
                'There are currently no options in the list, please enter the appropriate number of people.'
            )
        }).required('Please select district !'),
        total_price: yup.number().required()
    });

    const defaultValues = {
        email : {
            label : customers[0].email,
            value : customers[0].id + ''
        },
        checkin_at : '',
        checkout_at : '',
        adult_capacity : 0,
        kid_capacity : 0,
        type_room : {
            label : typeRooms[0].title,
            value : typeRooms[0].id + ''
        },
        total_price : 0
    }

    // hook form
    const form = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    })

    const watchCheckIn = useWatch({ control : form.control , name: "checkin_at"});
    const watchCheckOut = useWatch({ control : form.control , name: "checkout_at"});
    const watchTypeRoom = useWatch({ control : form.control , name: "type_room"});
    const watchAdultCapacity = useWatch({ control : form.control , name: "adult_capacity" , defaultValue: 0 });
    const watchKidCapacity = useWatch({ control : form.control , name: "kid_capacity" , defaultValue: 0 });
    const watchTotalPrice = useWatch({ control : form.control , name: "total_price" , defaultValue: 0});

    const handleChangeDatePicker = (name: FormFieldsBooking, value: Dayjs | null) => {
        form.setValue(name, value?.toISOString() || '')
    }

    // useMemo
    const optionTypeRoomFilter = useMemo<OptionSelect[]>(() => {
        if(
            watchAdultCapacity + '' === '' || 
            watchKidCapacity + '' === ''
        ) return []

        return typeRooms
            .filter(tRoom => 
                tRoom.adult_capacity >= watchAdultCapacity && 
                tRoom.kids_capacity >= watchKidCapacity
            )
            .map(
                tRoom => ({
                    label: tRoom.title,
                    value: tRoom.id || 0
                })
            )
    },[typeRooms , watchAdultCapacity , watchKidCapacity])

    const optionCustomers = useMemo<OptionSelect[]>(() => {
        return customers
            .map(customer => ({
                label : customer.email,
                value : customer.id || 0
            }))
    },[customers])

    const totalDate = useMemo(() => {
        return distanceTwoDate(watchCheckIn, watchCheckOut)
    },[watchCheckIn , watchCheckOut])

    // use Effect
    useEffectSkipFirstRender(() => {
        if(form.formState.isSubmitSuccessful){
            form.reset(defaultValues)
        }
    },[form.formState.isSubmitSuccessful])

    useEffectSkipFirstRender(() => {
        const typeRoomSelected = typeRooms.find(tRoom => (tRoom.id + '') === watchTypeRoom.value)
        const numberOfNight = totalDate - 1 
        if(typeRoomSelected){
            const totalPriceCal = (typeRoomSelected.base_price * numberOfNight) || 0
            form.setValue("total_price" , totalPriceCal)
        }
    },[watchTypeRoom, totalDate])

    useEffectSkipFirstRender(() => {
        if (optionTypeRoomFilter.length === 0) {
            form.setValue('type_room', {
                label: '',
                value: ''
            })
        } else {
            form.setValue('type_room', {
                label: optionTypeRoomFilter[0].label,
                value: optionTypeRoomFilter[0].value + ''
            })
            form.clearErrors('type_room.label')
            form.clearErrors('type_room.value')
        }
    }, [
        optionTypeRoomFilter
    ])
    
    return (
        <form 
            onSubmit={form.handleSubmit(onActionReversation)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">Form Booking Room</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
                    <Grid container columnSpacing={3}>
                        <Grid item sm={4}>
                            <SelectHk2t
                                options={optionCustomers} 
                                label='email' 
                                name='email' 
                                placeholder='select email customer' 
                                form={form}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t
                                form={form} 
                                label='check in' 
                                name='checkin_at' 
                                typeInput='date' 
                                minDate={dayjs()}
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
                                label='kid capacity' 
                                name='kid_capacity' 
                                typeInput='number'
                                placeholder='enter kids capacity' 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <SelectHk2t
                                options={optionTypeRoomFilter} 
                                label='type room' 
                                name='type_room' 
                                placeholder='select type room' 
                                form={form}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div 
                className="bl_btn__submit for_employee" 
                style={{justifyContent:"space-between"}}
            >
                <div className="bl_contentTotal">
                    <div className="bl_total">
                        Total date: {totalDate}
                    </div>
                    <div className="bl_total">
                        Number of night: {totalDate - 1}
                    </div>
                    <div className="bl_total">
                        Total price: {formatCurrency(watchTotalPrice)} vnđ
                    </div>
                </div>
                <ButtonHk2t
                    variant="contained"
                    content='Booking'
                    isUseForm={true}
                /> 
            </div>
        </form>
    )
}