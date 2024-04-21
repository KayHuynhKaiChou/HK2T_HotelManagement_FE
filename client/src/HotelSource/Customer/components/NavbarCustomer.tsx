import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import NavbarLeftCustomer from "./NavbarLeftCustomer";
import NavbarRightCustomer from "./NavbarRightCustomer";

function Navbar() {

  return (
    <AppBar 
      position="static"
      className="bl_navbarCustomer"
    >
      <Container 
        maxWidth="xl"
        className="bl_navbarCustomer_container"
      >
        <Toolbar 
          disableGutters
          className="bl_navbarCustomer_wrap"
        >
          <NavbarLeftCustomer/>
          <NavbarRightCustomer/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
