"use client";

import React, { type FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import { saveAs } from "file-saver";
// import { AspectRatio } from "../ui/aspect-ratio";

export interface Card1Props {
  className?: string;
  ratio?: string;
  hoverClass?: string;
  [key: string]: any; //any other props
}

const ImageCard: FC<Card1Props> = ({
  className = "",
  ratio = "",
  hoverClass = "",
  ...props
}) => {
  // CORS problem must be fix
  // const handleDownload = async () => {
  //   const imageUrl = props?.file?.data?.attributes.url;
  //   const imageName = props?.file?.data?.attributes.name || "image.jpg";
  //   if (imageUrl) {
  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();
  //     saveAs(blob, imageName);
  //   }
  // };

  const placeholderImage = "/images/placeholder-large-h.png";

  return (
    <div
      className={`${hoverClass} ${className} relative flex`}
      // className={`${hoverClass} ${className} relative flex h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[470px]`}
    >
      {props?.file?.data?.attributes.url && (
        <Image
          width={500}
          height={500}
          alt={props?.file?.data?.attributes.alternativeText ?? `media image`}
          className="h-full w-full rounded-md"
          src={props?.file?.data?.attributes.url ?? placeholderImage}
          sizes="(min-width: 808px) 50vw, 100vw"
        />
      )}
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
      {/* CORS problem must be fix */}
      {/* <Button
        className="absolute top-0 right-0"
        variant="default"
        onClick={handleDownload}
      >
        Télécharger
        <ButtonIcon variant="secondary" />
      </Button> */}
      {/* <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span> */}
      {props?.file?.data?.attributes.url && (
        <a
          download={props?.file?.data?.attributes.name || "image.jpg"}
          href={props?.file?.data?.attributes.url ?? ``}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="absolute bottom-4 right-5 h-fit w-fit"
            variant="default"
          >
            Télécharger
            <ButtonIcon variant="secondary" />
          </Button>
        </a>
      )}
    </div>
  );
};

export default ImageCard;
