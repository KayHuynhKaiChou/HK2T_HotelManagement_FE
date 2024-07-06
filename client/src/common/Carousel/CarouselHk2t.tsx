import { ReactNode, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
 
interface CarouselHk2t {
    indexSlider : number;
    onChangeIndexSlider : (indexSlider : number) => void;
    children : ReactNode;
    imageLinks?: Array<string>;
}
 
export default function CarouselHk2t({
    indexSlider,
    onChangeIndexSlider,
    children , 
    imageLinks = []
} : CarouselHk2t) {
    const sliderRef = useRef<Slider | null>(null);
 
    const CustomArrow = ({classNameCustom , onClick} : {classNameCustom : string , onClick?: () => void}) => {
        return imageLinks.length <= 1 ? <></> : (
            <div className={`bl_arrow ${classNameCustom}`} onClick={onClick}></div>
        )
    }
 
    const checkSelectedImage = useMemo(() => {
        return (index : number) => {
            return index == indexSlider ? 'is_selected' : ''
        }
    },[indexSlider])
 
    const handleSelectImage = (index : number) => {
        sliderRef.current?.slickGoTo(index)
        onChangeIndexSlider(index)
    }
 
    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        prevArrow: <CustomArrow classNameCustom={'bl_prevArrow'}/>,
        nextArrow: <CustomArrow classNameCustom={'bl_nextArrow'}/>,
        beforeChange: (current : any, next : any) => onChangeIndexSlider(next)
    };
   
    return (
        <>
            <div className="bl_slider_container">
                <Slider
                    ref={sliderRef}
                    {...settings}
                >
                    {children}
                </Slider>
            </div>
            <div className="bl_smallImages">
                {imageLinks.map((link , index) => (
                    <div
                        className={`bl_smallImage_wrap ${checkSelectedImage(index)}`}
                        onClick={() => handleSelectImage(index)}
                    >
                        <img src={link} alt="" />
                    </div>
                ))}
            </div>    
        </>
    );
}
