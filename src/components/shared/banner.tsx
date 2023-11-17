import React from "react";
import Title from "../ui/title";

interface BannerProps {
  text: string;
  position: "left" | "right";
}

const Banner: React.FC<BannerProps> = ({ text, position }) => {
  return (
    <div className="relative py-14 sm:py-20">
      <div
        className={`absolute top-0 ${
          position === "left" ? "left-0" : "right-0"
        } md:1/2 mx-auto flex h-28 w-full items-center justify-center bg-primary px-5 sm:w-2/3`}
      >
        <Title level={2} withLine={false} className="font-sans text-neutral-200">
          {text}
        </Title>
      </div>
    </div>
  );
};

export default Banner;
