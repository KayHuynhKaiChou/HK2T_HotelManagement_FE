import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import DashboardAdmin from '../components/DashboardAdmin';
import UserAdmin from '../components/UserAdmin';
import NavbarLeftAdmin from '../components/NavbarLeftAdmin';
import HeaderMenuAdmin from '../components/HeaderMenuAdmin';
import ProfileAdmin from '../components/ProfileAdmin';

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
  const [MenuComp, setMenuComp] = useState(<></>);

  const handleToggleNavbar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    switch (menu) {
      case 'dashboard':
        setMenuComp(<DashboardAdmin/>)
        break;
      case 'users':
        setMenuComp(<UserAdmin/>)
        break;
      case 'profile':
        setMenuComp(<ProfileAdmin/>)
        break;
      default:
        setMenuComp(<></>)
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
        DrawerHeader={DrawerHeader}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader/>
        {MenuComp}
      </Box>
    </Box>
  );
}
