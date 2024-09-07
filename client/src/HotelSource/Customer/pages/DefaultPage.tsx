import { Outlet } from "react-router-dom";
import Navbar from "../components/NavbarCustomer";

export default function DefaultPage() {
    return (
        <>
            <Navbar />
            <Outlet/>
        </>
    )
}
