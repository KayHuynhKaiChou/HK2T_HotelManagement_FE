import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import logo from "../../../assets/images/logo.png";
import { useState } from "react";
import { defaultPages } from "../../../utils/constants";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { uuid } from "../../../utils";

export default function NavbarLeftCustomer() {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (href: string) => {
      setAnchorElNav(null);
      navigate(href)
    };

    return (
      <div className="bl_navbarLeftCustomer_wrapper">
        <div className="bl_navbarLeftCustomer_logo">
          <img src={logo} alt="" />
        </div>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {defaultPages.map((page) => (
                <MenuItem key={uuid()} onClick={() => handleCloseNavMenu(page.href)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {defaultPages.map((page) => (
            <Button
              key={uuid()}
              onClick={() => handleCloseNavMenu(page.href)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page.title}
            </Button>
          ))}
        </Box>
      </div>
    );
}
