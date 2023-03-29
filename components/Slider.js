import { useRef, useEffect } from "react";
import Swiper from "swiper";
import "swiper/css/swiper.css";

const Slider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    new Swiper(sliderRef.current, {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
    });
  }, []);

  return (
    <div ref={sliderRef} className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
      </div>
    </div>
  );
};

export default Slider;
