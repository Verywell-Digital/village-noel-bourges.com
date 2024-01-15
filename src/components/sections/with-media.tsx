"use client";

import React, { FC, Suspense, useRef } from "react";
import Title from "../ui/title";
import { Button } from "../ui/button";
import ButtonIcon from "../ui/button-icon";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, EffectFade, Pagination } from "swiper";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { ScrollArea } from "../ui/scroll-area";
import { getImages } from "@/data/faker-data"; // Import functions to generate mock data

import { cn } from "@/lib/utils";
import Link from "next/link";

// interface LayoutProps {
//   position?: "default" | "reverse" | "centered";
// }

export interface WithMediaProps<T> {
  medias?: T[];
  position?: "left" | "right" | "center";
  className?: string;
  children?: React.ReactNode;
  // CardComponent: any;
  displayBackground?: boolean;
  displayButton?: boolean;
  isModal?: boolean;
  button?: {
    label: string;
    url: string;
  };
  [key: string]: any;
}

export default function WithMedia<T>({
  // layout = {
  //   position: "default",
  // },
  position = "left",
  // CardComponent,
  displayBackground = false,
  displayButton = true,
  isModal = false,
  medias,
  title,
  button = {
    label: "Default Label",
    url: "/",
  },
  description,
  children,
  className = "",
}: WithMediaProps<T>) {
  const getLayoutPosition = () => {
    switch (position) {
      case "right":
        return "md:flex-row";
      case "center":
        return "flex-col-reverse justify-center max-w-4xl text-left";
      default:
        return "md:flex-row-reverse";
    }
  };

  // const image = getImages(1);
  // const placeholderImage = image[0].url;
  const placeholderImage = "/images/placeholder-large-h.png";

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <>
      <div
        className={cn(
          "relative mx-auto flex flex-col items-center",
          getLayoutPosition(),
          className
        )}
      >
        <div
          className={cn(
            "flex w-full flex-col pb-6 ",
            position === "center"
              ? "w-full items-center text-center"
              : "md:w-[55%] md:px-16"
          )}
        >
          <Title
            className={` ${position === "center" ? "py-5" : "p-0"} uppercase`}
            level={2}
            isHTML
          >
            {title}
          </Title>
          <div
            className={cn(
              "mb-4 flex w-full",
              position === "center"
                ? "flex-col lg:flex-row lg:space-x-10"
                : "flex-col"
            )}
          >
            {children}
            <div
              className={cn(
                React.isValidElement(children) && position === "center"
                  ? "max-w-lg"
                  : "max-w-xl",
                "flex items-center text-left"
              )}
            >
              <div dangerouslySetInnerHTML={{ __html: description || "" }} />
            </div>
          </div>
          {displayButton && isModal ? (
            <Dialog>
              <DialogTrigger className="inline-flex items-center">
                {button?.label && (
                  <Button
                    isDialog
                    className="mt-5 flex w-fit pb-3.5 pt-3.5 text-white"
                  >
                    {button?.label} <ButtonIcon variant="accent" />
                    {/* add custom icon to properties (eg: plan icon for restaurant) */}
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent>
                <ScrollArea className="h-[75vh] w-full rounded-lg p-20">
                  <DialogHeader>
                    <Title
                      className="main-color mb0 max-w-xl pr-12 font-semibold"
                      level={2}
                      isHTML
                    >
                      {title}
                    </Title>
                  </DialogHeader>
                  <div className="w-full">
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={(medias as any)[0]?.url || placeholderImage}
                        alt={
                          (medias as any)[0]?.alternativeText ??
                          "animation image"
                        }
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ) : displayButton && button.url.length > 0 ? (
            <Link href={button.url || "/"}>
              <Button
                isDialog
                className="mt-5 flex w-fit pb-3.5 pt-3.5 text-white"
              >
                {button?.label} <ButtonIcon variant="accent" />
                {/* add custom icon to properties (eg: plan icon for restaurant) */}
              </Button>
            </Link>
          ) : null}
        </div>
        <div
          className={cn(
            "m-auto mb-4 flex w-full",
            position === "center" ? "md:w-full" : "md:w-[45%]"
          )}
        >
          <Swiper
            // effect={"fade"}
            spaceBetween={10}
            // navigation={true}
            pagination={{
              el: ".media-pagination",
              type: "bullets",
              clickable: true,
            }}
            navigation={{
              nextEl: ".media-next-slide-button",
              prevEl: ".media-prev-slide-button",
            }}
            className={`media-swiper h-fit w-full space-y-10 ${className}`}
            modules={[EffectFade, Navigation, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={() => setActiveIndex(swiperRef.current.activeIndex)}
          >
            {medias?.map((media, index) => (
              <SwiperSlide className="m-auto flex" key={index}>
                <Image
                  layout="responsive"
                  width={0}
                  height={0}
                  alt={(media as any)?.alternativeText ?? "image"}
                  className={`rounded-2xl object-top object-contain ${
                    medias.length > 1 && ""
                  }`}
                  src={(media as any)?.url || placeholderImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </SwiperSlide>
            ))}
            <div className="flex justify-between">
              <div className="media-pagination">
                {medias?.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => swiperRef.current.slideTo(index)}
                  />
                ))}
              </div>
              <div className="relative flex w-36 space-x-5">
                <div
                  onClick={undefined}
                  className="media-prev-slide-button swiper-button-prev"
                ></div>
                <div
                  onClick={undefined}
                  className="media-next-slide-button swiper-button-next"
                ></div>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
      {displayBackground && (
        <div
          className={cn("absolute h-full w-full  xl:w-[97%] 2xl:w-[90%]", {
            "left-0 top-0 bg-card xl:rounded-r-3xl": position === "left",
            "right-0 top-0 bg-card xl:rounded-l-3xl": position === "right",
            "mx-auto bg-transparent xl:rounded-3xl": position === "center",
          })}
        />
      )}
    </>
  );
}
