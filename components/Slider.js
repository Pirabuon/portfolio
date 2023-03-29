import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Autoplay]);

export default function App() {
  return (
    <Swiper
      slidesPerView={3}
      speed={1000}
      loop={true}
      autoplay={{ delay: 3000 }}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      className="mySwiper specialPromo"
    >
      <SwiperSlide key={1}>
        <div className="promoItem">Hello</div>
      </SwiperSlide>
      <SwiperSlide key={2}>
        <div className="promoItem">World</div>
      </SwiperSlide>
      <SwiperSlide key={3}>
        <div className="promoItem">Post</div>
      </SwiperSlide>
      <SwiperSlide key={4}>
        <div className="promoItem">grid</div>
      </SwiperSlide>
      <SwiperSlide key={5}>
        <div className="promoItem">cat</div>
      </SwiperSlide>
      <SwiperSlide key={6}>
        <div className="promoItem">list</div>
      </SwiperSlide>
    </Swiper>
  );
}
