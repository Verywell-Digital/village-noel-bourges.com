"use client";

import React, { type ReactNode, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Navigation, Grid, Pagination, Autoplay } from "swiper";

export interface MediaListSwiperProps<T> {
  className?: string;
  cardClassName?: string;
  CardComponent: any;
  itemPerRow?: number;
  data: T[];
  // renderItem?: (slideContent: T, index: number) => ReactNode;
}

export default function MediaListSwiper<T>({
  className = "",
  cardClassName = "",
  CardComponent,
  itemPerRow = undefined,
  data,
}: // renderItem = () => <div></div>,
MediaListSwiperProps<T>) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <>
      <Swiper
        slidesPerView={1} //if breakpoint let to 1
        grid={{
          rows: 2,
          fill: "row",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={15}
        className={`${className} w-full`}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
          },
          "@0.50": {
            slidesPerView: 2,
          },
          "@0.75": {
            slidesPerView: 3,
          },
          "@1.00": {
            slidesPerView: itemPerRow,
          },
        }}
        modules={[Navigation, Grid, Pagination, Autoplay]}
      >
        {data?.map((slideContent, index) => (
          <SwiperSlide key={index}>
            <CardComponent
              className={cardClassName}
              isSelected={selectedCard === index}
              setIsSelected={() => setSelectedCard(index)}
              key={index}
              {...slideContent}
            />
          </SwiperSlide>
        ))}
        <div className="nav-wrapper flex flex-wrap items-center justify-center pt-16">
          <div className="swiper-pagination order-2 mx-2.5"></div>
          <div className="swiper-button-prev order-1"></div>
          <div className="swiper-button-next order-3"></div>
        </div>
      </Swiper>
    </>
  );
}
