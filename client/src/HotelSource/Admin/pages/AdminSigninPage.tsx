import { useNavigate } from "react-router-dom";
import { Account } from "../../../types/models";
import { CssBaseline } from "@mui/material";
import FormSignInAdmin from "../components/FormSignInAdmin";

export default function AdminSigninPage() {
  const navigate = useNavigate();

  const handleSignIn = (values : Account) => {
    console.log(values)
  }

  return (
    <div className="bl_signInPageAdmin">
      <CssBaseline/>
      <div className="bl_signInPageAdmin_wrapper">
        <h1 className="bl_signInPageAdmin_ttl">Login</h1>
        <div className="bl_signInPageAdmin_form">
          <FormSignInAdmin handleSignIn={handleSignIn}/>
        </div>
      </div>
    </div>
  )
}
