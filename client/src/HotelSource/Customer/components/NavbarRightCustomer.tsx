import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";

export default function NavbarRightCustomer() {
    return (
        <Box className="bl_navbarRightCustomer_wrap">
            <Box className="bl_navbarRightCustomer_act">
                <AccountCircleIcon />
                <Typography sx={{ mx: "5px" }}>Sign In</Typography>
            </Box>
            <Box className="bl_navbarRightCustomer_act">
                <LoginIcon />
                <Typography sx={{ mx: "5px" }}>Sign Up</Typography>
            </Box>
        </Box>
    )
}
