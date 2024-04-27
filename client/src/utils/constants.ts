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

export const colorsBtnCustom = {
    primary : {
        background: "#337ab7",
        borderColor: "#2e6da4",
        hover: {
            backgroundColor: "#1565c0",
            borderColor: "#204d74"
        }
    },
    success : {
        background: "#26B99A",
        borderColor: "#169F85",
        hover: {
            backgroundColor: "#1b5e20",
            borderColor: "#398439"
        }
    },
    warning : {
        background: "#f0ad4e",
        borderColor: "#eea236",
        hover: {
            backgroundColor: "#e65100",
            borderColor: "#d58512"
        }
    },
    danger : {
        background: "#d9534f",
        borderColor: "#d43f3a",
        hover: {
            backgroundColor: "#c62828",
            borderColor: "#ac2925"
        }
    }
    
}

export const iconsSort = {
    NORMAL : {
        className : "fa-arrows-up-down"
    },
    ASC : {
        className : "fa-arrow-up-short-wide"
    },
    DESC : {
        className : "fa-arrow-down-wide-short"
    }
}

export const defaultPages = ["Home", "About", "Contact"] as const;

export const namesImageBanner = ['viewHotel' , 'roomHotel' , 'swimmingPoolHotel'];
