import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import DashboardAdmin from '../components/DashboardAdmin';
import UserAdmin from '../components/UserAdmin';
import NavbarLeftAdmin from '../components/NavbarLeftAdmin';
import HeaderMenuAdmin from '../components/HeaderMenuAdmin';
import ProfileAdmin from '../components/ProfileAdmin';
import AmenityAdmin from '../components/AmenityAdmin';
import TypeRoomAdmin from '../components/TypeRoomAdmin';
import { useDispatch } from 'react-redux';
import { amenityAction } from '../../../redux/actions/amenity';
import RoomAdmin from '../components/RoomAdmin';
import { typeRoomAction } from '../../../redux/actions/typeRoom';
import { userAction } from '../../../redux/actions/user';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function AdminHomePage() {
  const { menu } = useParams();
  const [open, setOpen] = useState(false);
  const [MenuComponent, setMenuComponent] = useState(<></>);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.showInforUser() as any)
    dispatch(typeRoomAction.showAllTypeRoom() as any)
    dispatch(amenityAction.showAllAmenity() as any)
  },[])

  const handleToggleNavbar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    switch (menu) {
      case 'dashboard':
        setMenuComponent(<DashboardAdmin/>)
        break;
      case 'users':
        setMenuComponent(<UserAdmin/>)
        break;
      case 'profile':
        setMenuComponent(<ProfileAdmin/>)
        break;
      case 'amenities':
        setMenuComponent(<AmenityAdmin/>)
        break;
      case 'types-room':
        setMenuComponent(<TypeRoomAdmin/>)
        break;
      case 'booking':
        setMenuComponent(<RoomAdmin/>)
        break;
      default:
        setMenuComponent(<></>)
        break;
    }
  },[menu])

  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderMenuAdmin
        open={open}
        onToggleNavbar={handleToggleNavbar}
      />
      <NavbarLeftAdmin
        open = {open}
        onChangeOpenNavbarLeft = {(isOpen : boolean) => setOpen(isOpen)}
        DrawerHeader={DrawerHeader}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader/>
        {MenuComponent}
      </Box>
    </Box>
  );
}
