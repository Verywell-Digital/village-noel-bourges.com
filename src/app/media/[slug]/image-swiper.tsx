"use client";

import React, { type ReactNode, useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper";

export interface ImageSwiperProps<T> {
  className?: string;
  cardClassName?: string;
  CardComponent: any;
  itemPerRow?: number;
  navigation?: any;
  transitionEffect?: boolean;
  data: T[];
  // renderItem?: (slideContent: T, index: number) => ReactNode;
}

export default function ImageSwiper<T>({
  className = "",
  cardClassName = "",
  CardComponent,
  itemPerRow = undefined,
  data,
  navigation,
  transitionEffect= false,
}: // renderItem = () => <div></div>,
ImageSwiperProps<T>) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <>
      <Swiper
        onSlideChangeTransitionEnd={(swiper) => {
          const fifthIndex = (swiper.realIndex + 4) % data.length;
          transitionEffect && setSelectedCard(fifthIndex);
        }}
        slidesPerView='auto'
        spaceBetween={100}
        // navigation={{
        //   nextEl: ".next-slide-button",
        //   prevEl: ".prev-slide-button",
        // }}
        navigation={navigation}
        autoHeight={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        // centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        //   reverseDirection: true,
        // }}
        loop={false}
        loopedSlides={1}
        className={`${className} w-full`}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
          },
          "@0.50": {
            slidesPerView: 1,
          },
          "@0.75": {
            slidesPerView: 1,
          },
          "@1.00": {
            slidesPerView: 1,
          },
        }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {data?.map((slideContent, index) => (
          <SwiperSlide className="relative" key={index}>
            <CardComponent
              className={cardClassName}
              isSelected={selectedCard === index}
              setIsSelected={() => setSelectedCard(index)}
              key={index}
              {...slideContent}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
