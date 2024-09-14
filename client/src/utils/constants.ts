import HouseIcon from '@mui/icons-material/House';
import PersonIcon from '@mui/icons-material/Person';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { ColumnType, MenuAdmin, OptionSelect, TypeSort } from '../types/supportUI';

export const listMenuAdmin : MenuAdmin[] = [
    {
        name : 'Dashboard',
        endpoint : 'dashboard',
        Icon : HouseIcon ,
        childrenMenu : []
    },
    {
        name : 'Users',
        endpoint : 'users',
        Icon : PersonIcon ,
        childrenMenu : []
    },
    {
        name : 'Rooms',
        endpoint : '',
        Icon : MeetingRoomIcon,
        childrenMenu : [
            {
                name : 'Booking',
                endpoint : 'booking',
                Icon : RadioButtonUncheckedIcon ,
                childrenMenu : []
            },
            {
                name : 'Types room',
                endpoint : 'types-room',
                Icon : RadioButtonUncheckedIcon ,
                childrenMenu : []
            },
            {
                name : 'Amenities',
                endpoint : 'amenities',
                Icon : RadioButtonUncheckedIcon ,
                childrenMenu : []
            }
        ]
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

export const defaultPages = [
    {
        title: "Home",
        href: '/'
    },
    {
        title: "Room",
        href: '/rooms'
    },
    {
        title: "About",
        href: '/'
    }
] as const;

export const namesImageBanner = ['viewHotel' , 'roomHotel' , 'swimmingPoolHotel'];

export const statusBooking = [
    {
        name : 'OPEN',
        color : colorsBtnCustom.primary.background
    },
    {
        name : 'INPROGRESS',
        color : colorsBtnCustom.warning.background
    },
    {
        name : 'END',
        color : colorsBtnCustom.success.background
    }, 
    {
        name : 'CANCEL',
        color : colorsBtnCustom.danger.background
    }
]

export const defaultGenders : string[] = [
    'MALE',
    'FEMALE'
]

export const defaultstatus : string[] = [
    'INACTIVE',
    'ACTIVE'
]

export const defaultPositions = [
    'ADMIN' , 'HOUSEKEEPER' , 'RECEPTIONIST' , 'CUSTOMER'
]

export const defaultViewDirection = [
    'RIVER',
    'CITY'
]

export const defaultTypeAmenity = [
    'GENERAL',
    'BATHROOM',
    'OTHER'
]

export const defaultPageSizeOptions : OptionSelect[] = [
    {
      label : '5',
      value : 5
    },
    {
      label : '10',
      value : 10
    },
    {
      label : '15',
      value : 15
    },
]

export const columnsLoading : ColumnType[] = Array.from({length : 7} , (_ , i) => ({id : `loading-${i}` , nameCol : '-'}))

export const rowsLoading = Array.from({length : 5} , () => {
    const row = {} as {[key : string] : string}
    columnsLoading.forEach(c => {
        row['-'] = c.nameCol
    })
    return row
})

export const defaultSortColumn : {id : ColumnType['id'] , type : TypeSort} = {id : '' , type : 'NORMAL'}

export const linkDefaultImage = 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png'

export const anotherPartServices : {title: string, backgroundImg: string}[] = [
    {
        title: 'Food services',
        backgroundImg: 'https://www.lottehotel.com/content/dam/lotte-hotel/lotte/saigon/dining/restaurant/italian-trattoria-oggi/6662-4-2000-din-LTHO.jpg.thumb.480.480.jpg'
    },
    {
        title: 'Hotel information',
        backgroundImg: 'https://www.lottehotel.com/content/dam/lotte-hotel/lotte/saigon/promotion/package/6625-1-1440-pkg-LTHO.jpg.thumb.480.480.jpg'
    },
    {
        title: 'Amenity & utilities',
        backgroundImg: 'https://www.lottehotel.com/content/dam/lotte-hotel/lotte/saigon/promotion/package/6437-1440-pkg-LTHO.jpg.thumb.480.480.jpg'
    },
]

export const defaultEndows : {title: string, backgroundImg: string}[] = [
    {
        title: 'Members-only events',
        backgroundImg: 'https://www.lottehotel.com/content/dam/lotte-hotel/common/member/pc-mai-rewards1.png'
    },
    {
        title: 'Attractive room rates and services',
        backgroundImg: 'https://www.lottehotel.com/content/dam/lotte-hotel/common/member/pc-mai-rewards2.png'
    },
    {
        title: 'Accumulate points and redeem rewards',
        backgroundImg: 'https://www.lottehotel.com/content/dam/lotte-hotel/common/member/pc-mai-rewards3.png'
    },
]