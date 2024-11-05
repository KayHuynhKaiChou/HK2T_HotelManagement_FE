import HotelIcon from '@mui/icons-material/Hotel';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Person3Icon from '@mui/icons-material/Person3';
import DateRangePickerHk2t from '../../../common/DateRangePicker/DateRangePickerHk2t';
import { distanceTwoDate, toastMSGObject, uuid } from '../../../utils';
import PopoverHk2t, { PopoverHandle } from '../../../common/Popover/PopoverHk2t';
import {MouseEvent, useMemo, useRef, useState} from 'react';
import { RootState } from '../../../redux/reducers';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MATH_ACTION, POSITION } from '../../../types/enum'
import useEffectSkipFirstRender from '../../../hooks/useEffectSkipFirstRender';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { useDispatch } from 'react-redux';
import { formBookingAction } from '../../../redux/actions/formBooking';
import { FormBooking } from '../../../types/form';

type QuantityCustomer = Pick<FormBooking , 'adult_number' | 'kid_number'>
  
export default function FormBookingCustomer() {
    //redux
    const {typeRooms, formBooking, user} = useSelector<RootState, RootState>(state => state);
    const dispatch = useDispatch();

    //navigate
    const navigate = useNavigate()

    //state
    const [quantityCustomer, setQuantityCustomer] = useState<QuantityCustomer>(
        { 
            adult_number: formBooking.adult_number, 
            kid_number: formBooking.kid_number 
        }
    )

    const uidPopover = `popover-select-quantity-${uuid()}`;
    const popoverRef = useRef<PopoverHandle | null>(null);

    // useMemo
    const nameTypeRoom = useMemo(() => {
        const selectedTypeRoom = typeRooms.find(typeRoom => typeRoom.id === formBooking.type_room_id)
        return (selectedTypeRoom && selectedTypeRoom.title)
    },[
        formBooking.type_room_id
    ])

    const contentNumberCustomers = useMemo(() => {
        return `${quantityCustomer.adult_number} adults - ${quantityCustomer.kid_number} children`
    },[
        quantityCustomer.adult_number,
        quantityCustomer.kid_number
    ])

    // func change state
    const handleOpenPopover = (e : MouseEvent<HTMLElement>) => {
        popoverRef.current && popoverRef.current.onOpen(e)
    }

    const handleChangeNumberCustomer = <T extends keyof QuantityCustomer>(action: MATH_ACTION, fieldName: T) => {
        const selectedTypeRoom = typeRooms.find(typeRoom => typeRoom.id === formBooking.type_room_id)
        if (!selectedTypeRoom) return

        switch (action) {
            case MATH_ACTION.PLUS:
                // eslint-disable-next-line no-case-declarations
                const quantityIncrease = quantityCustomer[fieldName] + 1
                if (quantityIncrease > selectedTypeRoom[fieldName.includes('adult') ? 'adult_capacity' : 'kids_capacity']) {
                    toast.success("Maximum occupancy for this room is 2 adults.", toastMSGObject())
                    return
                }
                setQuantityCustomer({
                    ...quantityCustomer,
                    [fieldName]: quantityIncrease
                })
                break;
            case MATH_ACTION.MINUS:
                // eslint-disable-next-line no-case-declarations
                const quantityDecrease = quantityCustomer[fieldName] - 1
                if (fieldName === 'adult_number' && quantityDecrease === 0) {
                    toast.warning("Must have at least 1 adult", toastMSGObject())
                    return
                }
                if (quantityDecrease >= 0) {
                    setQuantityCustomer({
                        ...quantityCustomer,
                        [fieldName]: quantityDecrease
                    })
                }
                break;
            default:
                break;
        }
    }

    const handleUpdateDateRange = (dateRange: DateRange<Dayjs>) => {
        const [checkin, checkout] = dateRange.map(date => date?.format('YYYY-MM-DD'))
        dispatch(
            formBookingAction.updateFormBooking("checkin_at", checkin || '')
        )
        dispatch(
            formBookingAction.updateFormBooking("checkout_at", checkout || '')
        )
    }

    const handleClosePopover = () => {
        dispatch(
            formBookingAction.updateFormBooking(
                "adult_number", quantityCustomer.adult_number
            )
        )
        dispatch(
            formBookingAction.updateFormBooking(
                "kid_number", quantityCustomer.kid_number
            )
        )
    }

    const handleNavigateReservation = () => {
        const distanceDate = distanceTwoDate(formBooking.checkin_at, formBooking.checkout_at)
        const numberOfNight = distanceDate - 1
        const selectedTypeRoom = typeRooms.find(typeRoom => typeRoom.id === formBooking.type_room_id)
        if (selectedTypeRoom) {
            const totalPrice = Number(selectedTypeRoom.base_price) * numberOfNight
            dispatch(
                formBookingAction.updateFormBooking("total_price", totalPrice)
            )
        }

        let url = ''
        if (user.token && user.position === POSITION.CUSTOMER) {
            url = '/reservation/person-infor'
        } else {
            url = '/sign_in'
        }
        navigate(url, { state: '/reservation/person-infor' })
    }

    // useEffect
    useEffectSkipFirstRender(() => {
        setQuantityCustomer({
            adult_number : 1,
            kid_number : 1
        })
    },[
        formBooking.type_room_id
    ])

    return (
        <div className="bl_formBooking_wrap">
            <div className="bl_formBookingGroup">
                <div className="bl_formBookingGroup_inner">
                    <HotelIcon/>
                    <div className="bl_formBooking_infor">{nameTypeRoom}</div>
                </div>
            </div>
            <div className="bl_formBookingGroup">
                <div className="bl_formBookingGroup_inner">
                    <DateRangeIcon/>
                    <DateRangePickerHk2t
                        initalDateRange={[
                            dayjs(formBooking.checkin_at), 
                            dayjs(formBooking.checkout_at)
                        ]}
                        handleCloseCalendar={handleUpdateDateRange}
                    />
                </div>
            </div>
            <div className="bl_formBookingGroup">
                <div className="bl_formBookingGroup_inner">
                    <Person3Icon/>
                    <div
                        aria-describedby={uidPopover} 
                        className="bl_formBooking_infor"
                        onClick={handleOpenPopover}
                    >
                        {contentNumberCustomers}
                    </div>
                    <PopoverHk2t
                        id={uidPopover}
                        ref={popoverRef}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                        onClosePopover={handleClosePopover}
                    >
                        <div className="bl_dropdown_inner">
                            <div className="bl_dropdown_item form_booking">
                                <div className="bl_dropdown_item_ttl">Adult</div>
                                <div className="bl_dropdown_textFieldNumber">
                                    <div 
                                        className="bl_act_btn"
                                        onClick={() => handleChangeNumberCustomer(MATH_ACTION.PLUS, "adult_number")}
                                    >+</div>
                                    <div className="bl_quantityPerson">{quantityCustomer.adult_number}</div>
                                    <div 
                                        className="bl_act_btn"
                                        onClick={() => handleChangeNumberCustomer(MATH_ACTION.MINUS, "adult_number")}
                                    >-</div>
                                </div>
                            </div>
                            <div className="bl_dropdown_item form_booking">
                                <div className="bl_dropdown_item_ttl">Kid</div>
                                <div className="bl_dropdown_textFieldNumber">
                                    <div 
                                        className="bl_act_btn"
                                        onClick={() => handleChangeNumberCustomer(MATH_ACTION.PLUS, "kid_number")}
                                    >+</div>
                                    <div className="bl_quantityPerson">{quantityCustomer.kid_number}</div>
                                    <div 
                                        className="bl_act_btn"
                                        onClick={() => handleChangeNumberCustomer(MATH_ACTION.MINUS, "kid_number")}
                                    >-</div>
                                </div>
                            </div>
                        </div>
                    </PopoverHk2t>
                </div>
            </div>
            <div 
                className="bl_formBookingGroup"
                onClick={handleNavigateReservation}
            >
                <div className="bl_formBookingGroup_btn">
                    booking now
                </div>
            </div>
        </div>
    )
}
