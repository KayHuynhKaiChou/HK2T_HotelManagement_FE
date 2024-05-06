import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

export default function NavbarRightCustomer() {
    const navigate = useNavigate();
    return (
        <Box className="bl_navbarRightCustomer_wrap">
            <Box className="bl_navbarRightCustomer_act">
                <AccountCircleIcon />
                <Typography 
                    sx={{ mx: "5px" }}
                    onClick={() => navigate('/sign_in')}
                >Sign In</Typography>
            </Box>
            <Box className="bl_navbarRightCustomer_act">
                <LoginIcon />
                <Typography 
                    sx={{ mx: "5px" }}
                    onClick={() => navigate('/sign_up')}
                >Sign Up</Typography>
            </Box>
        </Box>
    )
}
