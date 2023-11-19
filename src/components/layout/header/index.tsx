"use client";

import useScrollListener from "../../../hooks/use-scroll-listener";
import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { MobileNavigationMenu } from "./mobile-navigation-menu";
import Link from "next/link";
import Image from "next/image";

export default function Header({ ...props }: any) {
  const isScrolled = useScrollListener(0);

  return (
    <header
      className={`fixed top-0 z-30 w-screen bg-primary  ${
        isScrolled ? "" : "bg-primary"
      }`}
    >
      <div className="container relative flex">
        <Link className="absolute inset-0 left-3 w-1/3 max-w-[150px] lg:max-w-none md:w-full flex-wrap" href={"/"}>
          <Image
            className="rounded-b-md object-cover shadow-lg"
            width={193}
            height={95}
            src={props.logo.logoImg.data.attributes.url}
            alt={"logo image"}
            sizes="(max-width: 768px) 100vw"
            quality={100}
            priority={true}
          />
        </Link>
        {/* Desktop */}
        <div className="hidden min-h-[70px] w-full md:flex ml-[150px] lg:ml-[250px]">
          <DesktopNavigationMenu {...props} />
        </div>
        {/* Mobile */}
        <div className="flex w-full justify-end md:hidden">
          <MobileNavigationMenu {...props} />
        </div>
      </div>
    </header>
  );
}
