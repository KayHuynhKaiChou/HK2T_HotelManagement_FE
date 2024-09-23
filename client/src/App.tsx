import { BrowserRouter , Routes, Route } from "react-router-dom";
import SigninPage from "./HotelSource/Customer/pages/SigninPage";
import SignupPage from "./HotelSource/Customer/pages/SignupPage";
import AdminSigninPage from "./HotelSource/Admin/pages/AdminSigninPage";
import AdminHomePage from "./HotelSource/Admin/pages/AdminHomePage";
import HomePage from "./HotelSource/Customer/pages/HomePage";
import PersonalPage from "./HotelSource/Customer/pages/PersonalPage";
import ListRoomPage from "./HotelSource/Customer/pages/ListRoomPage";
import DefaultPage from "./HotelSource/Customer/pages/DefaultPage";
import DetailTypeRoomPage from "./HotelSource/Customer/pages/DetailTypeRoomPage";
import ReservationPage from "./HotelSource/Customer/pages/ReservationPage";
import InforCustomerPage from "./HotelSource/Customer/pages/InforCustomerPage";
import CompletedBookingPage from "./HotelSource/Customer/pages/CompletedBookingPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage/>}>
          <Route index element={<HomePage />} />
          <Route path="rooms" element={<ListRoomPage/>} />
          <Route path="rooms/:title" element={<DetailTypeRoomPage/>} />
          <Route path="reservation/" element={<ReservationPage/>} >
            <Route path="person-infor" element={<InforCustomerPage/>} />
            <Route path="payment" element={<CompletedBookingPage/>} />
          </Route>
        </Route>
        <Route path="admin" element={<AdminSigninPage/>}/>
        <Route path="admin/:menu" element={<AdminHomePage/>}/>
        <Route path="sign_in" element={<SigninPage/>}/>
        <Route path="sign_up" element={<SignupPage/>}/>
        <Route path="customer/:menu" element={<PersonalPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
