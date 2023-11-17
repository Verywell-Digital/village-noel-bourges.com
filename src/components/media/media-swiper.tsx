import React, { type ReactNode, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/navigation";
import 'swiper/css/pagination';

// import required modules
import { Navigation, EffectFade, Pagination } from "swiper";

export interface MediaSwiperProps<T> {
  className?: string;
  itemPerRow?: number;
  data: T[];
  renderItem?: (item: T, index: number) => ReactNode;
}

export default function MediaSwiper<T>({
  className = "",
  data,
  renderItem = () => <div></div>,
}: MediaSwiperProps<T>) {
  return (
    <>
      <Swiper
        effect={"fade"}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className={`media-swiper w-full sm:w-2/4 ${className}`}
        modules={[EffectFade, Navigation, Pagination]}
      >
        {data?.map((image, index) => (
          <SwiperSlide key={index}>{renderItem(image, index)}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
