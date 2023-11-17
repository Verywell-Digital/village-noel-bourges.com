"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import Media from ".";

export interface Card10Props {
  className?: string;
  data: any;
}

const MediaCard: FC<Card10Props> = ({ className = "h-full", data }) => {
  // const { href } = data;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* <Link href={href} className="absolute inset-0" /> */}

          <Media data={data} isHover={isHover} />

        {/* <Link
          href={href}
          className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
        ></Link> */}
    </div>
  );
};

export default MediaCard;
