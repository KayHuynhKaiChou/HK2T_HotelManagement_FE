import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/NavbarCustomer";
import FormBookingCustomer from "../components/FormBookingCustomer";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

export default function DefaultPage() {
    const { pathname } = useLocation();
    //redux
    const {formBooking} = useSelector<RootState, RootState>(state => state);
    
    const isShowFormBooking = useMemo(() => {
        return pathname !== '/' && !pathname.includes('/reservation') &&!pathname.includes('/customer')
    }, [pathname])

    useEffect(() => {
        const handleScroll = () => {
            const formContainerEle = document.querySelector('.bl_container_form') as HTMLDivElement;
            if (formContainerEle && formBooking.type_room_id) {
                formContainerEle.classList.add('active')
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true }); // Lắng nghe sự kiện cuộn trên window

        return () => {
            // Cleanup event listener khi component unmount
            window.removeEventListener('scroll', handleScroll);
        };
    },[])

    useEffect(() => {
        const formContainerEle = document.querySelector('.bl_container_form') as HTMLDivElement;
        if (formContainerEle && formBooking.type_room_id) {
            formContainerEle.classList.add('active')
        }
    }, [formBooking.type_room_id])

    // thêm key={pathname để ele .un_body_wrap được re-render lại}
    return (
        <div key={pathname} className="un_body_wrap">
            <Navbar />
            <Outlet/>
            {isShowFormBooking && (
                <div className={`bl_container_form`}>
                    <FormBookingCustomer/>
                </div>
            )}
        </div>
    )
}
