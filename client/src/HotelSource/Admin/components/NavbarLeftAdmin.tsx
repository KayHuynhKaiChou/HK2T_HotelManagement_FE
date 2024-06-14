import { Divider, Typography } from "@mui/material";
import List from '@mui/material/List';
import { listMenuAdmin } from '../../../utils/constants';
import { Icon } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { StyledComponent } from "@emotion/styled";
import MuiDrawer from '@mui/material/Drawer';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import PersonInfor from "../../../common/SummaryInfor/SummaryInfor";
import CollapseMenu from "./CollapseMenu";

interface NavbarLeftAdminProps {
    open : boolean;
    onChangeOpenNavbarLeft : (isOpen : boolean) => void;
    DrawerHeader : StyledComponent<object , React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, object>;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
  
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
);

export default function NavbarLeftAdmin({ open , DrawerHeader , onChangeOpenNavbarLeft } : NavbarLeftAdminProps) {
    const navigate = useNavigate();

    return (
        <Drawer className='un_navbarLeft' variant="permanent" open={open}>
            <DrawerHeader>
                <Icon className={`fa fa-paw un_hotelIcon__custom ${open ? '' : 'un_hotelIcon__customClose'}`} />
                <Typography variant='h5'>HK2T HOTEL &</Typography>
            </DrawerHeader>
            {open && <PersonInfor />}
            <Divider />
            <List>
                {listMenuAdmin.map(({ name, endpoint, Icon, childrenMenu }) => (
                    <ListItem key={name} disablePadding sx={{ display: 'block' }}>
                        {childrenMenu.length > 0 
                            ? (
                                <CollapseMenu
                                   menuAdmin={{ name, endpoint, Icon, childrenMenu }}
                                   open={open}
                                   onChangeOpenNavbarLeft={onChangeOpenNavbarLeft}
                                />
                            ) 
                            : (
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={() => navigate(`/admin/${endpoint}`)}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={name}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            )
                        }
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
    )
}
