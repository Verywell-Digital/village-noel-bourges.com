import React, { type FC } from "react";
import Image, { type ImageProps } from "next/image";

export interface CustomImageProps extends ImageProps {
  containerClassName?: string;
}

const CustomImage: FC<CustomImageProps> = ({
  containerClassName = "",
  alt = "custom-imgs",
  className = "object-cover w-full h-full",
  sizes = "(max-width: 600px) 480px, 800px",
  ...args
}) => {
  return (
    <div className={containerClassName}>
      <Image className={className} alt={alt} sizes={sizes} {...args} />
    </div>
  );
};

export default CustomImage;
