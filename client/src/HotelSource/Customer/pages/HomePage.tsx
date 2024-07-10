import BannerCustomer from "../components/BannerCustomer";
import IntroduceHotel from "../components/IntroduceHotel";
import Navbar from "../components/NavbarCustomer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <BannerCustomer/>
      <IntroduceHotel/>
    </div>
  )
}
