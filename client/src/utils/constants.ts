import HouseIcon from '@mui/icons-material/House';
import PersonIcon from '@mui/icons-material/Person';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { ChartType, ColumnType, MenuAdmin, OptionSelect, TypeSort } from '../types/supportUI';
import {CHART_TYPE, STATUS} from "../types/enum.ts";
import banner1 from "../assets/images/viewHotel.png";
import banner2 from "../assets/images/roomHotel.png";
import banner3 from "../assets/images/swimmingPoolHotel.png";
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';

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
        value : 0,
        title : 'The most booked room type',
        icon : {
            className : 'fa-solid fa-bed'
        }  
    },
    {
        value : 0,
        title : 'Number customer',
        icon : {
            className : 'fa-solid fa-user'
        }  
    },
    {
        value : 0,
        title : 'Number reservation status END',
        icon : {
            className : 'fa-solid fa-registered'
        }  
    },
    {
        value : 0,
        title : 'Total revenue',
        icon : {
            className : 'fa-solid fa-money-bill'
        }  
    }
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
    },
    dark : {
        background: "#333",
        borderColor: "#333",
        hover: {
            backgroundColor: "#000",
            borderColor: "#000"
        }
    },
    change : {
        background: "#ff9a00",
        borderColor: "#ff9a00",
        hover: {
            backgroundColor: "#ff9a009c",
            borderColor: "#ff9a009c"
        }
    },
    open : {
        background: "#eedb2d",
        borderColor: "#eedb2d",
        hover: {
            backgroundColor: "#c9ba35",
            borderColor: "#c9ba35"
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

export const namesImageBanner = [banner1, banner2, banner3];

export const statusBooking = [
    {
        name : 'WAITING',
        color : '#777777'
    },
    {
        name : 'OPEN',
        color : colorsBtnCustom.open.background
    },
    {
        name : 'IN PROGRESS',
        color : colorsBtnCustom.primary.background
    },
    {
        name : 'END',
        color : '#00de0b'
    }, 
    {
        name : 'CANCEL',
        color : colorsBtnCustom.danger.background
    }
]

export const enableFieldWithStatus = [
    STATUS.WAITING,
]

export const statusShowBtnCancel = [
    STATUS.WAITING,
    STATUS.OPEN,
    STATUS.IN_PROGRESS
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

export const defaultSteps = [
    'Choice type room',
    'Personal information',
    'Last step'
]

export const chartTypes : { Icon: any, name: ChartType, value: number }[] = [
    {
        Icon: BarChartIcon,
        name: 'COLUMNS',
        value: CHART_TYPE.COLUMNS
    },
    {
        Icon: StackedBarChartIcon,
        name: 'STACK COLUMNS',
        value: CHART_TYPE.STACK_COLUMNS
    },
    {
        Icon: ShowChartIcon,
        name: 'LINES',
        value: CHART_TYPE.LINES
    },
]

export const xAxisOptions = [
    {
        label: 'month',
        value: 1
    },
    {
        label: 'quarter',
        value: 2
    }
]

export const yAxisOptions = [
    {
        label: 'reservation',
        value: 1
    },
    {
        label: 'revenue',
        value: 2
    }
]

export const defaultColors = [
    "#FF5733", // Màu cam đậm
    "#33FF57", // Màu xanh lá
    "#3357FF", // Màu xanh dương
    "#FF33A6", // Màu hồng
    "#FFC300", // Màu vàng
    "#8E44AD", // Màu tím
    "#1ABC9C", // Màu xanh ngọc
    "#E74C3C", // Màu đỏ
    "#3498DB", // Màu xanh da trời
    "#F39C12"  // Màu cam sáng
];