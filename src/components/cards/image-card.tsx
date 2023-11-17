"use client";

import React, { type FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

export interface Card1Props {
  className?: string;
  ratio?: string;
  url: any;
  hoverClass?: string;
}

const ImageCard: FC<Card1Props> = ({
  className = "",
  ratio = "",
  url,
  hoverClass = "",
}) => {
  return (
    <div className={`${hoverClass} ${className}`}>
      {/* <AspectRatio ratio={16 / 9}>
        <Image
          src={url ?? ``}
          alt="Image"
          fill
          className="rounded-2xl object-cover"
          sizes="(max-width: 600px) 480px, 500px"
        />
      </AspectRatio> */}
      {/* <div className={`rounded-lg ${ratio}`}></div> */}
      <Image
          fill
          alt="Image card"
          className="h-full w-full object-cover rounded-2xl mb-20 aspect-[16/9]"
          src={url ?? ``}
          sizes="(max-width: 600px) 480px, 500px"
          priority
        />
      {/* <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span> */}
    </div>
  );
};

export default ImageCard;
