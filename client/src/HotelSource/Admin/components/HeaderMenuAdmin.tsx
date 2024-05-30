import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { drawerWidth } from '../../../utils/constants';
import PersonInforAdmin from './PersonInforAdmin';


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface HeaderMenuAdminProps {
    open : boolean
    onToggleNavbar : () => void
}

export default function HeaderMenuAdmin({ open , onToggleNavbar } : HeaderMenuAdminProps) {
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar className='un_headerMenu'>
                <IconButton
                    aria-label="open drawer"
                    onClick={onToggleNavbar}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        color: '#5A738E'
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <div className="un_headerMenu_inner">
                    <PersonInforAdmin isShowDropdown={true}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}
