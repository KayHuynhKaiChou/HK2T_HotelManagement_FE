import { Divider, Grid } from "@mui/material";
import InputHk2t from "../../../common/InputHk2t";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useForm, UseFormReturn, useWatch} from "react-hook-form";
import ButtonHk2t from "../../../common/ButtonHk2t";
import SelectHk2t from "../../../common/SelectHk2t";
import {ActionFormBooking, FormBooking} from "../../../types/form";
import dayjs from "dayjs";
import { Reversation, TypeRoom, User } from "../../../types/models";
import {forwardRef, useEffect, useImperativeHandle, useMemo} from "react";
import { OptionSelect } from "../../../types/supportUI";
import { distanceTwoDate, formatCurrency } from "../../../utils";
import {colorsBtnCustom, enableFieldWithStatus, statusShowBtnCancel} from "../../../utils/constants.ts";

interface FormBookingRoomProps {
    typeRooms : TypeRoom[];
    customers : User[];
    typeActionForm ?: ActionFormBooking;
    selectedReversation : Reversation;
    onActionReversation : (values : FormBooking) => void;
    onCancelReservation : () => void;
    onOpenReservation : () => void;
}

export interface FormBookingRoomHandle {
    form : UseFormReturn<FormBooking>
}

// type FormFieldsBooking = 'email' | 'checkin_at' | 'checkout_at' | 'adult_number' | 'kid_number';

const FormBookingRoom = forwardRef<FormBookingRoomHandle , FormBookingRoomProps>((props , ref) => {

    const {
        typeRooms,
        customers,
        selectedReversation,
        typeActionForm = "CREATE",
        onActionReversation,
        onCancelReservation,
        onOpenReservation
    } = props

    const schema = yup.object({
        // email: yup.object().shape({
        //     label: yup.string().required(),
        //     value: yup.number().required()
        // }).required('Please select email customer !'),
        checkin_at: yup.string()
                .required('Please choose check in !'),
        checkout_at: yup.string()
                .required('Please choose check out !'),
        adult_number: yup.number()
                .typeError('Please enter quantity adult !')
                .required('Please enter quantity adult !')
                .moreThan(0, 'Please must have at least 1 adult !'),
        kid_number: yup.number()
                .typeError('Please enter quantity kids !')
                .required('Please enter quantity kids !')
                .min(0, 'Quantity kids must be at least 0'),
        type_room: yup.object().shape({ // ban đầu disable , khi chọn adult và kids sau sẽ filter ra list type room phù hợp
            label: yup.string(),
            value: yup.number()
        }).required('Please select district !'),
        total_price: yup.number().required()
    });

    const generateDefaultValues = () => {
        const userPIC = customers.find(cus => cus.id === selectedReversation.user_id)
        return {
            email : {
                label : userPIC?.email || customers[0].email,
                value : userPIC?.id || customers[0].id || 0
            },
            checkin_at : selectedReversation.checkin_at || '',
            checkout_at : selectedReversation.checkout_at || '',
            adult_number : selectedReversation.adult_number,
            kid_number : selectedReversation.kid_number,
            type_room : {
                label : selectedReversation.room.type_room.title || typeRooms[0].title,
                value : selectedReversation.room.type_room.id || typeRooms[0].id
            },
            total_price : selectedReversation.total_price
        }
    }

    // hook form
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const form : UseFormReturn<FormBooking> = useForm({
        defaultValues: generateDefaultValues(),
        resolver: yupResolver(schema)
    })

    // useImperativeHandle hook
    useImperativeHandle(ref , () => ({ form }))

    // useWatch
    const watchCheckIn = useWatch({ control : form.control , name: "checkin_at"});
    const watchCheckOut = useWatch({ control : form.control , name: "checkout_at"});
    const watchTypeRoomId = useWatch({ control : form.control , name: "type_room.value"});
    const watchAdultNumber = useWatch({ control : form.control , name: "adult_number" });
    const watchKidNumber = useWatch({ control : form.control , name: "kid_number" });
    const watchTotalPrice = useWatch({ control : form.control , name: "total_price"});

    // const handleChangeDatePicker = (name: FormFieldsBooking, value: Dayjs | null) => {
    //     form.setValue(name, value?.toISOString() || '')
    // }

    // useMemo
    const optionTypeRoomFilter = useMemo<OptionSelect[]>(() => {
        return typeRooms
            .map(
                tRoom => ({
                    label: tRoom.title,
                    value: tRoom.id || 0
                })
            )
    },[typeRooms])

    const optionCustomers = useMemo<OptionSelect[]>(() => {
        return customers
            .map(customer => ({
                label : customer.email,
                value : customer.id || 0
            }))
    },[customers])

    const totalDate = useMemo(() => {
        return distanceTwoDate(watchCheckIn, watchCheckOut) || 0
    },[watchCheckIn , watchCheckOut])

    const selectedTypeRoom = useMemo(() => {
        const foundTypeRoom = typeRooms.find(tr => Number(tr.id) === watchTypeRoomId)
        return foundTypeRoom
    },[watchTypeRoomId])

    const labelAdultNumber = useMemo(
        () => selectedTypeRoom
            ? `adult number ( capacity max: ${selectedTypeRoom.adult_capacity} )`
            : 'adult number',
        [selectedTypeRoom]
    )

    const labelKidNumber = useMemo(
        () => selectedTypeRoom
            ? `kid number ( capacity max: ${selectedTypeRoom.kids_capacity} )`
            : 'kid number',
        [selectedTypeRoom]
    )

    const labelTypeRoom = useMemo(
        () => typeActionForm === "CREATE"
            ? 'type room'
            : `type room ( Room ${selectedReversation.room.room_number} )`,
        [selectedReversation]
    )

    const isDisabledFieldByStatus = useMemo(() => {
        return !enableFieldWithStatus.includes(selectedReversation.status);
    }, [selectedReversation])

    const isShowBtnCancel = useMemo(() => {
        return statusShowBtnCancel.includes(selectedReversation.status)
    }, [selectedReversation])

    // use Effect

    // useEffectSkipFirstRender(() => {
    //     if(form.formState.isSubmitSuccessful){
    //         form.reset(generateDefaultValues())
    //     }
    // },[form.formState.isSubmitSuccessful])

    useEffect(() => {
        const numberOfNight = totalDate - 1
        if(selectedTypeRoom && numberOfNight > 0){
            const totalPriceCal = (selectedTypeRoom.base_price * numberOfNight) || 0
            form.setValue("total_price" , totalPriceCal)
        }
    },[totalDate])

    // useEffectSkipFirstRender(() => {
    //     if (optionTypeRoomFilter.length === 0) {
    //         form.setValue('type_room', {
    //             label: '',
    //             value: ''
    //         })
    //     } else {
    //         form.setValue('type_room', {
    //             label: optionTypeRoomFilter[0].label,
    //             value: optionTypeRoomFilter[0].value + ''
    //         })
    //         form.clearErrors('type_room.label')
    //         form.clearErrors('type_room.value')
    //     }
    // }, [
    //     optionTypeRoomFilter
    // ])

    const handleSubmitForm = (values: FormBooking) => {
        const adult_capacity = Number(selectedTypeRoom?.adult_capacity);
        const kids_capacity = Number(selectedTypeRoom?.kids_capacity);

        if (watchAdultNumber > adult_capacity) {
            form.setError("adult_number", { type: 'max', message: `Max number of adult is ${adult_capacity}` })
            return;
        }

        if (watchKidNumber > kids_capacity) {
            form.setError("adult_number", { type: 'max', message: `Max number of kid is ${kids_capacity}` })
            return;
        }

        onActionReversation(values)
    }
    
    return (
        <form 
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">{`Form ${typeActionForm === 'UPDATE' ? 'Update' : 'Booking'} Room`}</div>
                {typeActionForm === 'CREATE' && <i>( This form has option type room to you select. )</i>}
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
                                disabled={typeActionForm === 'UPDATE' || isDisabledFieldByStatus}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t
                                form={form} 
                                label='check in' 
                                name='checkin_at' 
                                typeInput='date' 
                                minDate={dayjs()}
                                disabled={isDisabledFieldByStatus}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                form={form} 
                                label='check out' 
                                name='checkout_at' 
                                typeInput='date'
                                minDate={watchCheckIn ? dayjs(watchCheckIn).add(1, 'day') : dayjs()}
                                disabled={!watchCheckIn || isDisabledFieldByStatus}
                            />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3}>
                        <Grid item sm={4}>
                            <InputHk2t 
                                form={form} 
                                label={labelAdultNumber}
                                name='adult_number'
                                typeInput='number' 
                                placeholder='enter adult number'
                                disabled={isDisabledFieldByStatus}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t
                                form={form} 
                                label={labelKidNumber}
                                name='kid_number' 
                                typeInput='number'
                                placeholder='enter kids number'
                                disabled={isDisabledFieldByStatus}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <SelectHk2t
                                form={form}
                                options={optionTypeRoomFilter}
                                label={labelTypeRoom}
                                name='type_room'
                                placeholder='select type room'
                                disabled={!(typeActionForm === 'CREATE') || isDisabledFieldByStatus}
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
                        Number of night: {totalDate - 1 < 0 ? 0 : totalDate - 1}
                    </div>
                    <div className="bl_total">
                        Total price: {formatCurrency(watchTotalPrice)} vnđ
                    </div>
                </div>
                <div className="bl_btn_booking">
                    {!isDisabledFieldByStatus &&
                        <ButtonHk2t
                            colorCustom={ form.formState.isDirty ? colorsBtnCustom['change'] : colorsBtnCustom['primary']}
                            variant="contained"
                            content={typeActionForm === 'UPDATE' ? 'Update' : 'Booking'}
                            isUseForm={true}
                        />
                    }
                    {isShowBtnCancel && typeActionForm === 'UPDATE' &&
                        <ButtonHk2t
                            colorCustom={colorsBtnCustom['danger']}
                            variant="contained"
                            content="cancel"
                            onClick={onCancelReservation}
                        />
                    }
                    {!isDisabledFieldByStatus && typeActionForm === 'UPDATE' &&
                        <ButtonHk2t
                            colorCustom={colorsBtnCustom['open']}
                            variant="contained"
                            content="open"
                            onClick={onOpenReservation}
                        />
                    }
                </div>
            </div>
        </form>
    )
})

export default FormBookingRoom