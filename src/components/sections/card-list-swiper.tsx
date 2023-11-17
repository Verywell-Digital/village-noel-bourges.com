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

export interface CardListSwiperProps<T> {
  className?: string;
  cardClassName?: string;
  CardComponent: any;
  itemPerRow?: number;
  navigation?: any;
  transitionEffect?: boolean;
  data: T[];
  // renderItem?: (slideContent: T, index: number) => ReactNode;
}

export default function CardListSwiper<T>({
  className = "",
  cardClassName = "",
  CardComponent,
  itemPerRow = undefined,
  data,
  navigation,
  transitionEffect= false,
}: // renderItem = () => <div></div>,
CardListSwiperProps<T>) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <>
      <Swiper
        onSlideChangeTransitionEnd={(swiper) => {
          const fifthIndex = (swiper.realIndex + 4) % data.length;
          transitionEffect && setSelectedCard(fifthIndex);
        }}
        slidesPerView={1} // or 1
        spaceBetween={15}
        // navigation={{
        //   nextEl: ".next-slide-button",
        //   prevEl: ".prev-slide-button",
        // }}
        navigation={navigation}
        autoHeight={true}
        // pagination={{
        //   clickable: true,
        // }}
        // centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: true,
        //   pauseOnMouseEnter: true,
        //   reverseDirection: true,
        // }}
        loop={true}
        loopedSlides={2}
        className={`${className} w-full`}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: itemPerRow,
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
