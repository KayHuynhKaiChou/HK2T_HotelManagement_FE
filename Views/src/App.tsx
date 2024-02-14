import { BrowserRouter , Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import SigninPage from "./HotelSource/Customer/pages/SigninPage";
import SignupPage from "./HotelSource/Customer/pages/SignupPage";
import AdminSigninPage from "./HotelSource/Admin/pages/AdminSigninPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <></>
          </PrivateRoute>
        }/>
        <Route path="/admin" Component={AdminSigninPage}/>
        <Route path="/sign-in" Component={SigninPage}/>
        <Route path="/sign-up" Component={SignupPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
