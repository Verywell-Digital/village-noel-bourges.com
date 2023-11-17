import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function LogoGrid({ partners }) {
  return (
    <div className="mx-[-8px] flex flex-wrap">
      {partners?.map(
        (
          logo: {
            name: string;
            url: any;
            image: { data: { attributes: { url: string | StaticImport } } };
          },
          index: React.Key
        ) => (
          <div
            className="w-1/2 px-2 py-4 sm:w-1/3  md:w-1/5 md:py-8 lg:w-[14.2857%]"
            key={index}
          >
            <Link
              href={logo.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex h-40 w-40 transform rounded-md bg-card p-2 transition duration-200 ease-in-out hover:scale-105">
                <Image
                  src={logo?.image.data?.attributes.url}
                  alt={logo.name ?? "logo image"}
                  width={100}
                  height={100}
                  className="h-full w-full rounded-md object-contain object-center"
                  // sizes="(max-width: 200px) 50vw"
                  quality={50}
                  loading="lazy"
                />
              </div>
            </Link>
          </div>
        )
      )}
    </div>
  );
}
