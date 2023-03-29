import React, { useEffect, useState } from "react";
import Image from "next/image";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Autoplay]);

export default function App() {
  return (
    <>
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
        <SwiperSlide>
          <div className="promoItem">Hello</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="promoItem">World</div>
        </SwiperSlide>
  <SwiperSlide>
          <div className="promoItem">Hello</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="promoItem">World</div>
        </SwiperSlide>
  <SwiperSlide>
          <div className="promoItem">Hello</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="promoItem">World</div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
