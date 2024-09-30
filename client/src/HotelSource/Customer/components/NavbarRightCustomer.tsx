import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import PersonInfor from "../../../common/SummaryInfor/SummaryInfor";

export default function NavbarRightCustomer() {
    const {user} = useSelector<RootState , RootState>(state => state);
    const navigate = useNavigate();
    return (
        <>       
            {user.token && user.position == 4 ? (
                <PersonInfor 
                    isShowDropdown
                    position="CUSTOMER"
                />
            ) : (
                <Box className="bl_navbarRightCustomer_wrap">
                    <Box className="bl_navbarRightCustomer_act" onClick={() => navigate('/sign_in')}>
                        <AccountCircleIcon />
                        <Typography
                            sx={{ mx: "5px" }}
                        >Sign In</Typography>
                    </Box>
                    <Box className="bl_navbarRightCustomer_act" onClick={() => navigate('/sign_up')}>
                        <LoginIcon />
                        <Typography 
                            sx={{ mx: "5px" }}
                        >Sign Up</Typography>
                    </Box>
                </Box>
            )}
        </>
    )
}
