import { formatDateV1 } from "../../../utils";

export default function IntroduceHotel() {
  return (
    <div className='bl_introduceHotel_wrap'>
        <div className="bl_introduceHotel">
            <div className="bl_introduceHotel_infor">
                <h2 className="bl_infor_ttl">HK2T Hotel Introduce</h2>
                <div className="bl_infor_content">
                Located right in the heart of Ghenh Rang - Quy Nhon, HK2T Hotel is paradise
                Resort with beautiful views of the Saigon River. Enjoy a vacation
                memorable amidst the unique luxurious resort space and classy service
                and convenient location to explore famous tourist destinations.
                </div>
                <div className="bl_infor_weather">
                    <div className="bl_weather_label">Local weather</div>
                    <div className="bl_weather_wrap">
                        <img 
                            className="bl_cloud" 
                            src='https://www.lottehotel.com/content/dam/lotte-hotel/global/common/weather/ico_weathr_04.png'
                        />
                        <div className="bl_content">
                            <div className="bl_content_dateNow">
                                {formatDateV1(new Date())}
                            </div>
                            <div className="bl_content_temperature">
                                31℃
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bl_introduceHotel_map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.32986872797!2d109.17271307487015!3d13.819220186579695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f14c59b5e713f%3A0xec90efbee0c9d2b9!2zNTAgTmd1eeG7hW4gSHXhu4csIFRULiBUdXkgUGjGsOG7m2MsIFR1eSBQaMaw4bubYywgQsOsbmggxJDhu4tuaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1699259709205!5m2!1sen!2s"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
        <div className="bl_extraInfor">
            <div className="bl_extraInfor_content">
                <p>Check in 14:00</p>
                <p>Check out 12:00</p>
            </div>
            <div className="bl_extraInfor_content">
                <p>PHÒNG : 283</p>
                <p>Ẩm thực : 7</p>
                <p>spa : 6</p>
            </div>
            <div className="bl_extraInfor_content">
                <p>Số điện thoại : +84-28-3823-3333</p>
                <p>Đặt phòng : +84-28-3823-3333</p>
                <p>Fax : +84-28-3823-2333</p>
            </div>
            <div className="bl_extraInfor_content">
                <p>Cơ sở vật chất nổi bật : Phòng hội nghị,  Nhà hàng,  Quầy Bar & Lounge,  
                    Spa & Xông hơi,  Hồ bơi,  Khu vực phòng tập thể thao,  
                    Khu vực Executive Lounge</p>
            </div>
        </div>
    </div>
  )
}
