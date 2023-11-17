import Image from "next/image";
import CallToAction from "../shared/call-to-action";

export default async function Hero({ ...props }: any) {
  return (
    <div className=" flex w-full flex-col px-5 md:px-8 lg:flex-row">
      {/*<div className="w-full object-fill pb-4 lg:mr-[30px] lg:w-[calc(75%-30px)] lg:pb-0"> */}
      <div className="w-full pb-4 lg:pb-0 hidden md:flex">
        <Image
          alt={props.image.data?.attributes.alternativeText ?? "Image bannière"}
          src={props.image.data?.attributes.url}
          className="w-full rounded-2xl"
          sizes="(max-width: 1280px) 100vw, 1536px"
          width={1200}
          height={174}
          priority
        />
      </div>
      <div className="w-full pb-0 md:hidden">
        <Image
          alt={props.mobileImage.data?.attributes.alternativeText ?? "Image bannière"}
          sizes="(min-width: 808px) 50vw, 100vw"
          src={props.mobileImage.data?.attributes.url}
          className="w-full rounded-2xl"
          width={1200}
          height={174}
          priority
        />
      </div>
      {/*
      <CallToAction
        title={props.ctaTitle}
        label={props.button[0].label}
        href={props.button[0].url || '/'}
        className="rounded-2xl bg-primary p-5 lg:p-9 text-white button-l-0 justify-center flex h-full flex-col"
      />
      */}
    </div>
  );
}
