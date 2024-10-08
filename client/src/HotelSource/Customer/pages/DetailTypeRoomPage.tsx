import { useLocation, useParams } from "react-router-dom";
import BreadcrumbsHk2t from "../../../common/Breadcrumbs/BreadcrumbsHk2t";
import HomeIcon from '@mui/icons-material/Home';
import { Amenity, TypeAmenity, TypeRoom } from "../../../types/models";
import { useMemo } from "react";
import CarouselHk2t from "../../../common/Carousel/CarouselHk2t";
import { defaultTypeAmenity, defaultViewDirection, linkDefaultImage } from "../../../utils/constants";
import parse from 'html-react-parser';
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { convertAmenitiesArrayToObject, formatContentAmenitiesOfTypeAme } from "../../../utils";

export default function DetailTypeRoomPage() {
    const { title: titleParam } = useParams();
    const location = useLocation();
    const typeRoom : TypeRoom = location.state || {};
    //redux
    const {amenities : amenitiesStore} = useSelector<RootState , RootState>(state => state);
    
    const { 
        title, images, adult_capacity, kids_capacity, 
        size, view_direction, base_price, 
        preferential_services, amenities
    } = typeRoom

    const formatTitleAgain = useMemo(() => {
        return titleParam 
            ? titleParam.replace('Room','Phòng').replaceAll('-',' ')
            : ''
    }, [titleParam])

    const ListImages = useMemo(() => {
        if(images.length == 0) return (
            <div className="bl_img_wrap bl_img_default">
                <img src={linkDefaultImage} />
            </div>
        )
        return images.map(img => (
            <div className="bl_img_wrap">
                <img src={img.link} />
            </div>
        ))
    }, [images])

    const contentOverview = useMemo(() => {
        return {
            title: "Room overview",
            contents: [
                {
                    cnt1: {
                        name: "Quantity adult",
                        value: `${adult_capacity} customers`
                    },
                    cnt2: {
                        name: "Quantity kids",
                        value: `${adult_capacity} customers`
                    }
                },
                {
                    cnt1: {
                        name: "View direction",
                        value: defaultViewDirection[view_direction - 1].toLowerCase()
                    },
                    cnt2: {
                        name: "Size room",
                        value: `${size} ㎡`
                    }
                },
                {
                    cnt1: {
                        name: "Price 1 night",
                        value: `${base_price} vnđ`
                    }
                }
            ]
        }
    }, [
        adult_capacity,
        kids_capacity,
        view_direction,
        size,
        base_price
    ])

    const specialOffers = useMemo(() => {
        return {
            title: 'Special Offers',
            content: preferential_services
        }
    }, [preferential_services])

    const amenity = useMemo(() => {
        return {
            title: 'Amenities',
            content: convertAmenitiesArrayToObject(amenitiesStore)
        }
    }, [amenities])

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
            <div className="bl_dtr_inner">
                <div className="bl_dtr_header">{title}</div>
                <div className="bl_carousel_wrap">
                    <CarouselHk2t
                        children={ListImages}
                    />
                </div>
                <div className="bl_dtr_inforCom border_top">
                    <div className="bl_inforCom_ttl">{contentOverview.title}</div>
                    {contentOverview.contents.map(({cnt1, cnt2}) => (
                        <div className="bl_overview_content">
                            <div className="bl_sub_content">
                                <div className="bl_cnt_name">{cnt1.name}</div>
                                <div className="bl_cnt_value">{cnt1.value}</div>
                            </div>
                            {cnt2 && (
                                <div className="bl_sub_content">
                                    <div className="bl_cnt_name">{cnt2.name}</div>
                                    <div className="bl_cnt_value">{cnt2.value}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="bl_dtr_inforCom border_top">
                    <div className="bl_inforCom_ttl">{specialOffers.title}</div>
                    <div className="bl_overview_content">
                        <div className="bl_sub_content">
                            {parse(specialOffers.content)}
                        </div>
                    </div>
                </div>
                <div className="bl_dtr_inforCom border_top">
                    <div className="bl_inforCom_ttl">{amenity.title}</div>
                    {defaultTypeAmenity.map((value) => (
                        <div className="bl_amenity_content">
                            <div className="bl_cnt_type">{value}</div>
                            <div className="bl_cnt_amenities">
                                {formatContentAmenitiesOfTypeAme(amenity.content[value.toLowerCase() as TypeAmenity])}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bl_dtr_inforCom border_top">
                    <div className="bl_inforCom_ttl">Contact information</div>
                    <div className="bl_overview_content">
                        <div className="bl_sub_content">
                            <div className="bl_cnt_name contact">TEL</div>
                            <div className="bl_cnt_value">+84-935-187-859</div>
                        </div>
                        <div className="bl_sub_content">
                            <div className="bl_cnt_name contact">FAX</div>
                            <div className="bl_cnt_value">+84-115-237-819</div>
                        </div>
                        <div className="bl_sub_content">
                            <div className="bl_cnt_name contact">EMAIL</div>
                            <div className="bl_cnt_value">hotelhk2t@gmail.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
