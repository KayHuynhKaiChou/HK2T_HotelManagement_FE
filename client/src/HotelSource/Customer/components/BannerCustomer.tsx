import { useEffect, useRef } from "react";
import { namesImageBanner } from "../../../utils/constants";

export default function BannerCustomer() {
    const bannerEle = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setInterval(() => {
            if(bannerEle.current){
                const linkImage = bannerEle.current.style.backgroundImage;
                let indexNameImage = namesImageBanner.findIndex(nameImg => linkImage.includes(nameImg));
                if(indexNameImage == namesImageBanner.length - 1){
                    indexNameImage = 0;
                }else{
                    indexNameImage++;
                }
                bannerEle.current.style.backgroundImage = `url(${namesImageBanner[indexNameImage]})`
            }
        },10000)
    },[])

    return (
        <div
            ref={bannerEle}
            className="bl_bannerCustomer_wrap"
        >
            <div className="bl_bannerCustomer">
                <div className="bl_bannerCustomer_title">
                    <h2>HK2T Hotel Booking</h2>
                    <p>Hệ thống đặt phòng khách sạn trực tuyến</p>
                </div>
            </div>
        </div>
    )
}
