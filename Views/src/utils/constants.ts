import HouseIcon from '@mui/icons-material/House';
import PersonIcon from '@mui/icons-material/Person';

export const listMenuAdmin = [
    {
        name : 'Bảng điều khiển',
        endpoint : 'dashboard',
        Icon : HouseIcon
    },
    {
        name : 'Người dùng',
        endpoint : 'users',
        Icon : PersonIcon
    }
]

export const listReports = [
    {
        total : 0,
        title : 'Đăng ký hôm nay',
        icon : {
            className : 'fa-caret-square-right'
        }  
    },
    {
        total : 0,
        title : 'Trả phòng hôm nay',
        icon : {
            className : 'fa-comments'
        }  
    },
    {
        total : 0,
        title : 'Công suất hiện nay',
        icon : {
            className : 'fa-sort-amount-desc'
        }  
    },
    {
        total : 0,
        title : 'Đăng ký hôm nay',
        icon : {
            className : 'fa-caret-square-right'
        }  
    },
]

export const drawerWidth = 240;
