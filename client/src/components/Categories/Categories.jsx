import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import slide1 from "../../assets/home/slide1.jpg";
import slide2 from "../../assets/home/slide2.jpg";
import slide3 from "../../assets/home/slide3.jpg";
import slide4 from "../../assets/home/slide4.jpg";
import SectionTitle from "../SectionTitle/SectionTitle";
const Categories = () => {
  return (
    <section className="pb-24 pt-12">
      <SectionTitle
        heading={"ORDER ONLINE"}
        subHeading={"From 11:00am to 10:00pm"}
      />
      <div className="container mx-auto px-6 lg:px-8 text-3xl text-white text-center uppercase">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination]}
          className="mySwiper h-[450px]"
        >
          <SwiperSlide>
            <img src={slide1} className="w-full h-[450px]" />
            <h3 className="-mt-16 drop-shadow-lg">Salads</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide2} className="w-full h-[450px]" />
            <h3 className="-mt-16 drop-shadow-lg">pizzas</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide3} className="w-full h-[450px]" />
            <h3 className="-mt-16 drop-shadow-lg">Soups</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide4} className="w-full h-[450px]" />
            <h3 className="-mt-16 drop-shadow-lg">desserts</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide1} className="w-full h-[450px]" />
            <h3 className="-mt-16 drop-shadow-lg">Salads</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide2} className="w-full h-[450px]" />
            <h3 className="-mt-16 drop-shadow-lg">pizzas</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide3} className="w-full h-[450px]" />
            <h3 className="-mt-16 drop-shadow-lg">Soups</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide4} className="w-full h-[450px]" />
            <h3 className="-mt-16 drop-shadow-lg">desserts</h3>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
