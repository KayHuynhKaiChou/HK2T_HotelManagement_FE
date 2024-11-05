import StepperHk2t from "../../../common/Stepper/StepperHk2t";
import { defaultSteps } from "../../../utils/constants";
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import {Outlet, useLocation} from "react-router-dom";
import { useMemo } from "react";
import ReservationInforCommon from "../components/ReservationInforCommon.tsx";

export default function ReservationPage() {
    //redux
    const { formBooking } = useSelector<RootState , RootState>(state => state);

    const { pathname } = useLocation();

    const activeStep = useMemo(() => {
        if (pathname.includes('payment')) {
            return 2
        } else {
            return 1
        }
    }, [pathname])

    return (
        <div className="bl_ReservationPage_wrap">
            <div className="bl_stepper_wrap">
                <StepperHk2t
                    steps={defaultSteps}
                    activeStep={activeStep}
                />
            </div>
            <div className="bl_reservation_grid">
                <div className="bl_grid_column">
                    <ReservationInforCommon
                        checkin_at={formBooking.checkin_at}
                        checkout_at={formBooking.checkout_at}
                        type_room_id={formBooking.type_room_id}
                        total_price={formBooking.total_price}
                    />
                </div>
                <Outlet/>
            </div>
        </div>
    )
}
