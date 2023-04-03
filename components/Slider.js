import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/link.module.css";

SwiperCore.use([Autoplay]);

export default function App() {
  const router = useRouter();
  const [slides, setSlides] = useState([
    {
      id: 1,
      href: "/science",
      label: "அறிவியல்",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/atom.png",
    },
    {
      id: 2,
      href: "/abnormal",
      label: "அமானுடம்",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/ufo.png",
    },
    {
      id: 3,
      href: "/history",
      label: "வரலாறு",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/history.png",
    },
    {
      id: 4,
      href: "/mystery",
      label: "வினோதங்கள்",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/mystery.png",
    },
    {
      id: 5,
      href: "/scholars",
      label: "மேதைகள்",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/einstein.png",
    },
  ]);

  return (
    <Swiper
      slidesPerView={3}
      speed={1000}
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
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="promoItem">
            <Link href={slide.href}>
              <a className={`promoLink ${router.pathname.includes(slide.href) ? "active" : ""}`}>
                <img src={slide.imgUrl} style={{ width: "20px", height: "auto" }} />
                {slide.label}
              </a>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
