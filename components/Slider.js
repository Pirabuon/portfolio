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
        <div className="promoItem">
         <Link
              className={
                router.pathname == "/science" || router.pathname == "/blog/[slug]"
                  ? "active"
                  : ""
              }
              href="/"
            >
              <img
                src="https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp"
                style={{ width: "20px", height: "auto" }}
              />
              அறிவியல்
            </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide key={2}>
        <div className="promoItem">
         <Link
              className={
                router.pathname == "/abnormal" || router.pathname == "/blog/[slug]"
                  ? "active"
                  : ""
              }
              href="/"
            >
              <img
                src="https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp"
                style={{ width: "20px", height: "auto" }}
              />
              அமானுடம்
            </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide key={3}>
        <div className="promoItem">
         <Link
              className={
                router.pathname == "/history" || router.pathname == "/blog/[slug]"
                  ? "active"
                  : ""
              }
              href="/"
            >
              <img
                src="https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp"
                style={{ width: "20px", height: "auto" }}
              />
              வரலாறு
            </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide key={4}>
        <div className="promoItem">
         <Link
              className={
                router.pathname == "/mystery" || router.pathname == "/blog/[slug]"
                  ? "active"
                  : ""
              }
              href="/"
            >
              <img
                src="https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp"
                style={{ width: "20px", height: "auto" }}
              />
              வினோதங்கள்
            </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide key={5}>
        <div className="promoItem">
         <Link
              className={
                router.pathname == "/scholars" || router.pathname == "/blog/[slug]"
                  ? "active"
                  : ""
              }
              href="/"
            >
              <img
                src="https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp"
                style={{ width: "20px", height: "auto" }}
              />
              மேதைகள்
            </Link>
        </div>
      </SwiperSlide>
     
    </Swiper>
  );
}
