"use client";

import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Player({ url, className }) {
  return (
    <ReactPlayer
      className={className}
      url={url}
      controls={true}
    />
  );
}
