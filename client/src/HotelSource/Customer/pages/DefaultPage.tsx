import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/NavbarCustomer";
import FormBookingCustomer from "../components/FormBookingCustomer";
import { useEffect } from "react";

export default function DefaultPage() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        const handleScroll = () => {
            const formContainerEle = document.querySelector('.bl_container_form') as HTMLDivElement;
            if (formContainerEle) {
                formContainerEle.classList.add('active')
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true }); // Lắng nghe sự kiện cuộn trên window

        return () => {
            // Cleanup event listener khi component unmount
            window.removeEventListener('scroll', handleScroll);
        };
    },[])

    // thêm key={pathname để ele .un_body_wrap được re-render lại}
    return (
        <div key={pathname} className="un_body_wrap">
            <Navbar />
            <Outlet/>
            {pathname !== '/' && (
                <div className={`bl_container_form`}>
                    <FormBookingCustomer/>
                </div>
            )}
        </div>
    )
}
