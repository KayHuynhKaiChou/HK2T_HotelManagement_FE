import { useSelector } from "react-redux";
import GateWay from "../../../lib/api_gateway";
import {ActionFormBooking, FormBooking} from "../../../types/form";
import CalenderHotel from "./CalenderHotel";
import FormBookingRoom, {FormBookingRoomHandle} from "./FormBookingRoom";
import { RootState } from "../../../redux/reducers";
import {useMemo, useRef, useState} from "react";
import {
    formatReversationsToEventsCalender,
    formatRoomsToResourcesCalender,
    scrollToForm,
    toastMSGObject
} from "../../../utils";
import { RefetchQueryFilters, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Reversation, Room, User } from "../../../types/models";
import { toast } from "react-toastify";
import { queryKeyAllReversation, queryKeyAllRoom, queryKeyAllUser } from "../../../tanstack/key";
import { useDialogHk2t } from "../../../common/Dialog/dialogHk2t";
import { useLoadingHk2tScreen } from "../../../common/Loading/LoadingHk2tScreen";
import { ResponseFormat } from "../../../types/response";
import { MESSAGE } from "../../../utils/messages";
import { POSITION, STATUS } from "../../../types/enum";
import dayjs from "dayjs";

type RoomResponse = Omit<Room , 'type_room'> & {type_room_id : number}

const initReversation = {
    id: 0,
    user_id: 0,
    room_id: 0,
    checkin_at: "",
    checkout_at: "",
    adult_number: 1,
    kid_number: 0,
    status: 1,
    total_price: 0,
    updated_at: "",
    created_at: "",
    room: {
        id : 0,
        type_room : {
            id: 0,
            title : '',
            preferential_services : '',
            view_direction : 2,
            size : 0,
            adult_capacity : 0,
            kids_capacity : 0,
            base_price : 0,
            amenities : [],
            images : [],
            status : 1,
            created_at : '',
            updated_at : ''
        },
        room_number : 0,
        floor : 0,
        status : 1
    }
}

export default function RoomAdmin() {
    const {typeRooms, user} = useSelector<RootState , RootState>(state => state);

    // state
    const [typeActionForm, setTypeActionForm] = useState<ActionFormBooking>('CREATE')
    const [selectedReversation, setSelectedReversation] = useState<Reversation>(initReversation as Reversation)
    const [countKey, setCountKey] = useState(1)

    // ref
    const formBookingWrapRef = useRef<HTMLDivElement | null>(null);
    const formBookingRoomRef = useRef<FormBookingRoomHandle | null>(null);

    //common useContext
    const dialog = useDialogHk2t();
    const loading = useLoadingHk2tScreen();

    // query
    const queryClient = useQueryClient();
    const listUsers = queryClient.getQueryData<User[]>([queryKeyAllUser]);
    const listReversations = queryClient.getQueryData<Reversation[]>([queryKeyAllReversation]);

    // const fetchGetAllAvailableRooms = async () : Promise<Room[]> => {
    //     const gateway = new GateWay('user' , user.token);
    //     const res = await gateway.get({action : 'show-available-room'});
    //     const responseRooms = res.result as RoomResponse[];
    //     return responseRooms.map(resRoom => {
    //         const foundTypeRoom = typeRooms.find(typeRoom => typeRoom!.id === resRoom.type_room_id) as Room['type_room']
    //         return {
    //             id : resRoom.id,
    //             floor : resRoom.floor,
    //             status : resRoom.status,
    //             room_number : resRoom.room_number,
    //             type_room : foundTypeRoom
    //         }
    //     })
    // }

    const fetchGetAllRooms = async () : Promise<Room[]> => {
        const gateway = new GateWay('admin' , user.token);
        const res = await gateway.get({action : 'show-room'});
        const responseRooms = res.result as RoomResponse[];
        return responseRooms.map(resRoom => {
            const foundTypeRoom = typeRooms.find(typeRoom => typeRoom!.id === resRoom.type_room_id) as Room['type_room']
            return {
                id : resRoom.id,
                floor : resRoom.floor,
                status : resRoom.status,
                room_number : resRoom.room_number,
                type_room : foundTypeRoom
            }
        })
    }

    const { data: listRooms} = useQuery<Room[]>({
        queryKey : [queryKeyAllRoom], 
        queryFn : fetchGetAllRooms,
        staleTime: 24 * 60 * 60 * 1000
    })

    // mutation for action create
    const mutationBookingRoom = useMutation<ResponseFormat , unknown , FormBooking>({
        mutationFn: async (data: FormBooking) => {
            const payload = {
                user_id : Number(data.email.value),
                checkin_at : new Date(data.checkin_at).toISOString(),
                checkout_at : new Date(data.checkout_at).toISOString(),
                adult_number : data.adult_number,
                kid_number : data.kid_number,
                room_id : selectedReversation.room.id === 0 ? null : selectedReversation.room.id,
                type_room_id : Number(data.type_room.value),
                total_price : data.total_price
            }
            const gateway = new GateWay('user' , user.token)
            const response = await gateway.post({action : 'create-re'} , payload);
            if (response.status === 200) {
                return response;
            } else if (response.status === 400){
                throw new Error(response.message);
            } else {
                throw new Error(MESSAGE.REVERSATION.CREATE.FAIL)
            }
        },
        onSettled: () => {
            loading.hide()
        },
        onSuccess: async () => {
            toast.success(MESSAGE.REVERSATION.CREATE.SUCCESS, toastMSGObject());
            await queryClient.invalidateQueries([queryKeyAllReversation] as RefetchQueryFilters);
            window.scrollTo({ top : 0 , behavior : "smooth" })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setSelectedReversation({...initReversation})
            setTypeActionForm('CREATE')
            setCountKey(countKey + 1)
        },
        onError: (error) => {
            toast.error((error + '').split(':')[1].trim(), toastMSGObject());
        }
    });

    const mutationUpdateReservation = useMutation<ResponseFormat , unknown , FormBooking>({
        mutationFn: async (data: FormBooking) => {
            const payload = {
                checkin_at : new Date(data.checkin_at).toISOString(),
                checkout_at : new Date(data.checkout_at).toISOString(),
                adult_number : data.adult_number,
                kid_number : data.kid_number,
                total_price : data.total_price,
            }
            const gateway = new GateWay('admin' , user.token)
            const response = await gateway.post({action : 'update-re', reservation_id : selectedReversation.id + ''} , payload);
            if (response.status === 200) {
                return response;
            } else if (response.status === 400){
                throw new Error(response.message);
            } else {
                throw new Error(MESSAGE.REVERSATION.UPDATE.FAIL)
            }
        },
        onSettled: () => {
            loading.hide()
        },
        onSuccess: async () => {
            toast.success(MESSAGE.REVERSATION.UPDATE.SUCCESS, toastMSGObject());
            await queryClient.invalidateQueries([queryKeyAllReversation] as RefetchQueryFilters);
            window.scrollTo({ top : 0 , behavior : "smooth" })
            setCountKey(countKey + 1)
        },
        onError: (error) => {
            toast.error((error + '').split(':')[1].trim(), toastMSGObject());
        }
    });

    const handleActionBookingRoom = async (values : FormBooking) => {
        loading.show()
        typeActionForm === 'UPDATE'
            ? mutationUpdateReservation.mutate(values)
            : mutationBookingRoom.mutate(values)
    }

    const handleSelectedReversation = (idSelected: Reversation['id']) => {
        const handleSelectedReservationLogic = () => {
            const foundRev = listReversations && listReversations.find(re => re.id === idSelected)
            if (foundRev) {
                scrollToForm(formBookingWrapRef)
                setSelectedReversation(foundRev)
                setTypeActionForm("UPDATE")
                setCountKey(countKey + 1)
            }
        }
        const isDirtyForm = formBookingRoomRef.current?.form.formState.isDirty;
        if (isDirtyForm) {
            dialog.show(
                <p>{MESSAGE.CONFIRM_SUBMIT}</p>,
                handleSelectedReservationLogic,
                'CONFIRM'
            )
        } else {
            handleSelectedReservationLogic()
        }
    }

    const handleSelectDateRange = (startDate: string, endDate: string, resourceId: string) => {
        const handleSelectDateRangeLogic = () => {
            const isCanBooking = dayjs(startDate, 'YYYY-MM-DD').isSame(dayjs(), 'day') || dayjs(startDate, 'YYYY-MM-DD').isAfter(dayjs(), 'day');
            if (listRooms && isCanBooking) {
                const selectedRoom = listRooms.find(room => room.id === Number(resourceId));
                if (selectedRoom) {
                    scrollToForm(formBookingWrapRef)
                    setSelectedReversation({
                        ...initReversation,
                        checkin_at: startDate,
                        checkout_at: dayjs(endDate).subtract(1, 'day').format('YYYY-MM-DD'),
                        room: selectedRoom
                    })
                }
                setTypeActionForm("BOOKING")
                setCountKey(countKey + 1)
            } else {
                dialog.show(
                    <p>When create a reservation, the check-in date cannot be in the past, please select date range again.</p>
                )
            }
        }
        const isDirtyForm = formBookingRoomRef.current?.form.formState.isDirty;
        if (isDirtyForm) {
            dialog.show(
                <p>{MESSAGE.CONFIRM_SUBMIT}</p>,
                handleSelectDateRangeLogic,
                'CONFIRM'
            )
        } else {
            handleSelectDateRangeLogic()
        }
    }

    const handleCancelReservation = async () => {
        loading.show();

        const gateway = new GateWay('admin' , user.token)
        const response = await gateway.post({action : 'cancel', reservation_id : selectedReversation.id + ''});

        if (response.status === 200) {
            setSelectedReversation({
                ...selectedReversation,
                status: STATUS.CANCEL
            })
            setCountKey(countKey + 1)
            await queryClient.invalidateQueries([queryKeyAllReversation] as RefetchQueryFilters);
            window.scrollTo({ top : 0 , behavior : "smooth" })
        }

        loading.hide();
    }

    const handleOpenReservation = async () => {
        loading.show();
        
        const gateway = new GateWay('admin' , user.token)
        const response = await gateway.post({action : 'open', reservation_id : selectedReversation.id + ''});

        if (response.status === 200) {
            setSelectedReversation({
                ...selectedReversation,
                status: STATUS.OPEN
            })
            setCountKey(countKey + 1)
            await queryClient.invalidateQueries([queryKeyAllReversation] as RefetchQueryFilters);
            window.scrollTo({ top : 0 , behavior : "smooth" })
        }

        loading.hide();
    }

    const customers = useMemo(() => {
        if(listUsers){
            return listUsers.filter(user => user.position === POSITION.CUSTOMER)
        }
        return []
    },[listUsers])

    const resources = useMemo(() => {
        if(listRooms){
            return formatRoomsToResourcesCalender(listRooms)
        }
        return []
    },[listRooms])

    const events = useMemo(() => {
        if(listReversations && listUsers){
            return formatReversationsToEventsCalender(listReversations , listUsers)
        }
        return []
    },[listReversations , listUsers])

    return (
        <>
            {resources && events && (
                <CalenderHotel 
                    resources={resources}
                    events={events}
                    onSelectEvent={handleSelectedReversation}
                    onSelectDateRange={handleSelectDateRange}
                />
            )}
            <div className="un_padding_updown_12"></div>
            <div
                className="bl_profile"
                ref={formBookingWrapRef}
            >
                <div className="bl_profile_inner">
                    {customers.length > 0 && (
                        <FormBookingRoom
                            key={'keyFormBooking' + '-' + countKey}
                            ref={formBookingRoomRef}
                            typeRooms={typeRooms}
                            customers={customers}
                            onActionReversation={handleActionBookingRoom}
                            selectedReversation={selectedReversation}
                            typeActionForm={typeActionForm}
                            onCancelReservation={handleCancelReservation}
                            onOpenReservation={handleOpenReservation}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
