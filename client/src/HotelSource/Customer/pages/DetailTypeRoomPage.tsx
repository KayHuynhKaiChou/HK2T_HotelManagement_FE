import { useLocation, useParams } from "react-router-dom";
import BreadcrumbsHk2t from "../../../common/Breadcrumbs/BreadcrumbsHk2t";
import HomeIcon from '@mui/icons-material/Home';
import { TypeRoom } from "../../../types/models";
import { useMemo } from "react";

export default function DetailTypeRoomPage() {
    const { title } = useParams();
    const location = useLocation();
    const { typeRoom } : {typeRoom: TypeRoom} = location.state || {};

    const formatTitleAgain = useMemo(() => {
        return title 
            ? title.replace('Room','Phòng').replaceAll('-',' ')
            : ''
    }, [title])

    return (
        <div className="bl_DetailTypeRoom_wrap">
            <div className="bl_breadCrumbs_wrap">
                <BreadcrumbsHk2t
                    listBreadcrumbs={[
                        {
                            label: "Home",
                            icon: <HomeIcon fontSize="small" />,
                            href: "/"
                        },
                        {
                            label: "Rooms",
                            href: "/rooms"
                        },
                        {
                            label: formatTitleAgain
                        }
                    ]}
                />
            </div>
        </div>
    )
}
