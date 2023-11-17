"use client";

import React, { FC } from "react";
// import { DataType } from "@/data/types";
import MediaVideo from "./media-video";
import MediaAudio from "./media-audio";
import Link from "next/link";
import Image from "next/image";
import MediaCarrousel from "./media-swiper";
import { MediaDataType } from "@/data/types";
import MediaTypeIcon from "./media-type-icon";

export interface MediaProps {
  className?: string;
  data: any;
  isHover?: boolean;
}

const Media: FC<MediaProps> = ({
  className = "w-full h-full",
  data,
  isHover = false,
}) => {
  const { image, mediaType, videoUrl, galleryImgs, audioUrl, id, href } =
    data || {};

  const isMedia = () => mediaType === "video" || mediaType === "audio";

  const renderGallerySlider = () => {
    if (!galleryImgs) return null;
    return (
      <MediaCarrousel
        // href={href}
        data={galleryImgs}
      />
    );
  };

  const renderContent = () => {
    // GALLERY
    if (mediaType === "gallery") {
      return renderGallerySlider();
    }

    // VIDEO
    if (mediaType === "video" && !!videoUrl && isHover) {
      return <MediaVideo isHover videoUrl={videoUrl} />;
    }

    // AUDIO
    if (mediaType === "audio" && !!audioUrl) {
      return <MediaAudio data={data} />;
    }

    // ICON
    return isMedia() ? (
      <span className="absolute inset-0 flex items-center justify-center ">
        <MediaTypeIcon
          className="hover:scale-105 transform cursor-pointer transition-transform"
          mediaType={mediaType}
        />
      </span>
    ) : null;
  };

  return (
    <div className={`relative ${className}`}>
      {mediaType !== "gallery" && (
        <Image
          alt="featured"
          fill
          className="object-cover"
          src={image}
          sizes="(max-width: 600px) 480px, 800px"
        />
      )}
      {renderContent()}
      {/* {mediaType !== "gallery" && (
        <Link
          href={href}
          className={`block absolute inset-0 ${
            !mediaType || mediaType === "standard"
              ? "bg-black/20 transition-opacity opacity-0 group-hover:opacity-100"
              : ""
          }`}
        />
      )} */}
    </div>
  );
};

export default Media;
