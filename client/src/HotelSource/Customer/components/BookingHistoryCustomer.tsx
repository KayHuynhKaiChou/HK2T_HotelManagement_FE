import GateWay from "../../../lib/api_gateway";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {useEffect, useMemo, useState} from "react";
import {Reversation} from "../../../types/models.ts";
import BookingHistoryCard from "./BookingHistoryCard.tsx";
import StackHk2T from "../../../common/Stack/StackHk2t.tsx";
import ModalHk2T from "../../../common/Modal/ModalHk2t.tsx";
import ReservationInforCommon from "./ReservationInforCommon.tsx";
import PaymentDepositBooking from "./PaymentDepositBooking.tsx";
import TypeRoomInforBooking from "./TypeRoomInforBooking.tsx";
import ButtonHk2t from "../../../common/ButtonHk2t.tsx";
import {colorsBtnCustom, statusShowBtnCancel} from "../../../utils/constants.ts";
import {STATUS} from "../../../types/enum.ts";
import {MESSAGE} from "../../../utils/messages.ts";
import {useDialogHk2t} from "../../../common/Dialog/dialogHk2t.tsx";
import {useLoadingHk2tScreen} from "../../../common/Loading/LoadingHk2tScreen.tsx";
import {toast} from "react-toastify";
import {toastMSGObject} from "../../../utils";

function BookingHistoryCustomer() {
    // redux
    const {user, typeRooms} = useSelector<RootState, RootState>(state => state);
    // common
    const dialog = useDialogHk2t();
    const loading = useLoadingHk2tScreen();
    // state
    const [listBooking, setListBooking] = useState<Reversation[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Reversation | null>(null)

    const isShowBtnCancel = useMemo(() => {
       return selectedBooking && statusShowBtnCancel.includes(selectedBooking.status)
    }, [selectedBooking])

    const isShowPaymentDeposit = useMemo(() => {
        return selectedBooking && selectedBooking.status === STATUS.WAITING
    }, [selectedBooking])

    const fetchListYourBookingHistory = async () => {
        const gateway = new GateWay('customer', user.token)
        const response = await gateway.get({action: 'show-list-re'});
        let listBookingResult = response.result as Reversation[];
        listBookingResult = listBookingResult.map(b => {
            const foundTypeRoom = typeRooms.find(tr => tr.id === b.room.type_room.id)
            return {
                ...b,
                room: {
                    ...b.room,
                    type_room: {
                        ...b.room.type_room,
                        images: foundTypeRoom?.images || []
                    }
                }
            }
        })
        setListBooking(listBookingResult);
    }

    const handleViewBooking = (booking: Reversation) => {
        setSelectedBooking(booking);
        setOpen(true)
    }

    const handleCancelBooking = async () => {
        if (selectedBooking) {
            loading.show();
            const gateway = new GateWay('customer' , user.token)
            const response = await gateway.post({action : 'cancel', reservation_id : selectedBooking.id + ''});
            if (response.status === 200) {
                setSelectedBooking({
                    ...selectedBooking,
                    status: STATUS.CANCEL
                })

                const listBookingClone = [...listBooking];
                const foundBooking = listBookingClone.find(b => b.id === selectedBooking.id)
                if (foundBooking) {
                    foundBooking.status = STATUS.CANCEL
                }
                setListBooking([
                    ...listBookingClone,
                ])

                if (selectedBooking.status === STATUS.IN_PROGRESS) {
                    toast.success(MESSAGE.REVERSATION.STATUS_IN_PROGRESS.CANCEL_SUCCESS, toastMSGObject());
                }
            }
            loading.hide();
        }
    }

    const handleConfirmCancel = async () => {
        if (selectedBooking) {
            if (selectedBooking.status === STATUS.OPEN) {
                await handleCancelBooking();
                dialog.show(
                    <p>{MESSAGE.REVERSATION.STATUS_OPEN.CANCEL_SUCCESS}</p>
                )
            } else if (selectedBooking.status === STATUS.IN_PROGRESS){
                dialog.show(
                    <p>{MESSAGE.REVERSATION.STATUS_IN_PROGRESS.CONFIRM_CANCEL}</p>,
                    handleCancelBooking,
                    'CONFIRM'
                )
            } else {
                await handleCancelBooking();
            }
        }
    }

    useEffect(() => {
        fetchListYourBookingHistory();
    }, [])

    return (
        <>
            <div className="bl_profile">
                <div className="bl_profile_inner">
                    <h3 className="bl_bookingHistory_ttl">List your booking</h3>
                    <StackHk2T
                        list={listBooking.map((booking) => (
                            <BookingHistoryCard
                                reservation={booking}
                                onClickView={() => handleViewBooking(booking)}
                            />
                        ))}
                        backgroundColorItem="#f9f9f9"
                    />
                </div>
            </div>
            <ModalHk2T
                header={'Detail information booking'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className="bl_ReservationPage_wrap" style={{margin: 0}}>
                    <div className="bl_reservation_grid" style={{margin: 0}}>
                        {selectedBooking && (
                            <>
                                <div className="bl_grid_column">
                                    <ReservationInforCommon
                                        checkin_at={selectedBooking.checkin_at}
                                        checkout_at={selectedBooking.checkout_at}
                                        type_room_id={selectedBooking.room.type_room.id || 0}
                                        total_price={selectedBooking.total_price}
                                        status={selectedBooking.status}
                                    />
                                </div>
                                <div className="bl_grid_column">
                                    <TypeRoomInforBooking
                                        typeRoom={selectedBooking.room.type_room}
                                        kid_number={selectedBooking.kid_number}
                                        adult_number={selectedBooking.adult_number}
                                        checkin_at={selectedBooking.checkin_at}
                                    />
                                    {isShowPaymentDeposit && (
                                        <PaymentDepositBooking total_price={selectedBooking.total_price}/>
                                    )}
                                    {isShowBtnCancel && (
                                        <div className="bl_btns_wrap">
                                            <ButtonHk2t
                                                content='cancel booking'
                                                colorCustom={colorsBtnCustom.danger}
                                                onClick={handleConfirmCancel}
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </ModalHk2T>
        </>
    );
}

export default BookingHistoryCustomer;