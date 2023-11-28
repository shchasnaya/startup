import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from "swiper";
import {Review} from "../../../utils/mocs";
import {useRef, useState} from "react";

import "./Review.scss"
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(1);

  const countStart = new Array(5).fill(1);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className={"slider"}>
      <Swiper
        modules={[Navigation]}
        loop={true}
        slidesPerView={3}
        spaceBetween={20}
        pagination={{clickable: true}}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onRealIndexChange={(element) => setCurrentSlide(element.realIndex)}
        onBeforeSlideChangeStart = {((swiper) => {
          swiper.realIndex = 1
          setCurrentSlide(1)
          if (typeof swiper.params.navigation === 'object') {

            if ("prevEl" in swiper.params.navigation) {
              swiper.params.navigation.prevEl = navigationPrevRef.current ;
            }
            if ("nextEl" in swiper.params.navigation) {
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }
          }

        })}
      >
        {Review.map((item, index) =>
          <SwiperSlide key={index}>
            <div className={"slider__item"}>
              <div>
                <div className={"slider__item_name"}>{item.name}</div>
                <div className={"slider__item_position"}>{item.position}</div>
              </div>
              <div>
                <div className={"slider__item_stars"}>
                  {countStart.map((_, index) => {
                    if (index < item.stars) return <div key={index}><img src={require("../../../_assets/icons/activeStar.png")} alt="active start"/></div>
                    else return <div key={index}><img src={require("../../../_assets/icons/star.png")} alt="not active start"/></div>
                  })}
                </div>
                <div className={"slider__item_comment"} title={item.comment}>{item.comment}</div>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      <button className="slider__btn slider__btn_left" ref={navigationPrevRef}>
        <img src={require("../../../_assets/icons/leftArrow.png")} alt="previous arrow"/>
      </button>
      <button className="slider__btn slider__btn_right" ref={navigationNextRef}>
        <img src={require("../../../_assets/icons/rightArrow.png")} alt="next arrow"/>
      </button>
      <div className="slider__bullet">
        {Review.map((_, index) => (
          <div
            key={index}
            className={`slider__bullet_item ${currentSlide === index ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;