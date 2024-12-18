import { useSelector } from "react-redux";
import BreadcrumbsHk2t from "../../../common/Breadcrumbs/BreadcrumbsHk2t";
import HomeIcon from '@mui/icons-material/Home';
import { RootState } from "../../../redux/reducers";
import TypeRoomInforCommonCustomer from "../components/TypeRoomInforCommonCustomer";

export default function ListRoomPage() {
    const { typeRooms } = useSelector<RootState , RootState>(state => state);
    const SUB_TITLE = 'HK2T Hotel’s 283 elegant rooms combine traditional décor and first-class amenities, with stunning views of the Saigon River or the bustling city.'
    
    return (
        <div className="bl_ListRoom_wrap">
            <div className="bl_breadCrumbs_wrap">
                <BreadcrumbsHk2t
                    listBreadcrumbs={[
                        {
                            label: "Home",
                            icon: <HomeIcon fontSize="small" />,
                            href: "/"
                        },
                        {
                            label: "Rooms"
                        }
                    ]}
                />
            </div>
            <div className="bl_ListRoom_header">
                <h1>Room</h1>
                <div className="bl_header_subTtl">
                    <span>{SUB_TITLE}</span>
                </div>
            </div>
            <div className="bl_ListRoom_body">
                {typeRooms.map(typeRoom => (
                    <TypeRoomInforCommonCustomer
                        typeRoom={typeRoom}
                    />
                ))}
            </div>
        </div>
    )
}
