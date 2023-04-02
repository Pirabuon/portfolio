import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import Link from "next/link";
import { useRouter } from "next/router";

SwiperCore.use([Autoplay]);

export default function App() {
  const router = useRouter();
  const [slides, setSlides] = useState([
    {
      id: 1,
      href: "/science",
      label: "அறிவியல்",
      imgUrl: "https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp",
    },
    {
      id: 2,
      href: "/abnormal",
      label: "அமானுடம்",
      imgUrl: "https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp",
    },
    {
      id: 3,
      href: "/history",
      label: "வரலாறு",
      imgUrl: "https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp",
    },
    {
      id: 4,
      href: "/mystery",
      label: "வினோதங்கள்",
      imgUrl: "https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp",
    },
    {
      id: 5,
      href: "/scholars",
      label: "மேதைகள்",
      imgUrl: "https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp",
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
              <a className={router.pathname.includes(slide.href) ? "active" : ""}>
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
