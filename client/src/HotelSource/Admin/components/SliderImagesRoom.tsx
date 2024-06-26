import { useMemo } from "react";
import CarouselHk2t from "../../../common/Carousel/CarouselHk2t";

interface SliderImagesRoomProps {
    imageLinks : string[];
}
 
export default function SliderImagesRoom({imageLinks} : SliderImagesRoomProps) {
    // const imageLinks = [
    //     'https://cf.bstatic.com/xdata/images/hotel/max1024x768/374457336.jpg?k=6731a76d664e48a93841c5a6002ee11bd6f396edacaffc16fffcafcc2d94de64&o=',
    //     'https://cf.bstatic.com/xdata/images/hotel/max1024x768/348610924.jpg?k=056facaac22aedec114a3ee4e4a0cb29a782616c0c02fd12aec9d7d610939103&o=',
    //     'https://cf.bstatic.com/xdata/images/hotel/max1024x768/540577071.jpg?k=6399cb737b84570939a6476f242836f5c46ac7249d00fac413edcd8ea4fc6dd9&o=',
    //     'https://cf.bstatic.com/xdata/images/hotel/max1024x768/348609918.jpg?k=50e8c52f5a61b645c52d6542c618cb138988a90bc15ecc31c2566098a158697f&o='
    // ]
    const ListImages = useMemo(() => {
        if(imageLinks.length == 0) return (
            <div className="bl_img_wrap bl_img_default">
                <img src='https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png' />
            </div>
        )
        return imageLinks.map(link => (
            <div className="bl_img_wrap">
                <img src={link} />
            </div>
        ))
    }, [imageLinks])
 
    return (
        <div className="bl_sliderImages_wrap">
            <CarouselHk2t
                children={ListImages}
                imageLinks={imageLinks}
            />
        </div>
    )
}