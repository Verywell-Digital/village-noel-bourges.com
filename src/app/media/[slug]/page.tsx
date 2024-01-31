import { getGqlData } from "@/utils/get-graphql-data";
import { GET_MEDIA_BY_SLUG, GET_MEDIA_PAGE } from "@/lib/gql";
import ImageSwiper from "./image-swiper";
import ImageCard from "./image-card";
import Title from "@/components/ui/title";
import DownloadAllButton from "./download-all";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import PDFViewer from "@/components/media/pdf-viewer";
import Player from "./player";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getGqlData(GET_MEDIA_PAGE, "subsiteMediaPages");
  const mediaPageData = data[0];

  return {
    title: `${mediaPageData?.seo[0]?.meta_Title} | ${params?.slug}`,
    description: mediaPageData?.seo[0]?.meta_Description,
  };
}

export default async function Page({
  params,
}: // searchParams,
{
  params: { slug: string }; //api to get params without "use-client" -> https://nextjs.org/docs/app/api-reference/file-conventions/page
  // searchParams: { [key: string]: string | string[] | undefined };
}) {
  const mediaData = await getGqlData(
    GET_MEDIA_BY_SLUG,
    "subsiteMediaContents",
    params,
  );
  const media = mediaData[0];

  return (
    <div className="pb-20">
      <div className="container">
        <div className="flex flex-col justify-between pb-8 md:flex-row md:items-end">
          <div className="flex flex-col">
            <div className="mb-2 w-fit rounded-2xl border border-solid border-card-foreground px-2.5 py-px text-base text-card-foreground">
              {media?.category?.data?.attributes.name}
            </div>
            <div className="w-fit rounded-2xl bg-primary px-2.5 py-px text-lg text-background xl:text-xl 2xl:text-2xl">
              {media?.date}
            </div>
            <Title className="mt-5 font-bold">{media?.name}</Title>
          </div>
          {/* <div className="mb-5 h-fit w-fit md:mb-6">
            <DownloadAllButton media={media} />
          </div> */}
        </div>
      </div>

      <div className=" flex justify-center lg:pb-12">
        <div className="relative w-full">
          {media?.medias[0].url ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Player className="container" url={media?.medias[0].url} />
            </Suspense>
          ) : media?.medias[0]?.file?.data?.attributes.url.endsWith(".pdf") ? (
            <PDFViewer
              className="container"
              file={media?.medias[0]?.file?.data?.attributes}
            />
          ) : (
            <>
              <div className="relative w-full">
                <div className="media-swiper-btn mx-auto flex justify-center">
                  <div
                    onClick={undefined}
                    className="medias-detail-prev-slide-button swiper-button-prev"
                  />
                  <div
                    onClick={undefined}
                    className="medias-detail-next-slide-button swiper-button-next"
                  />
                </div>
                <ImageSwiper
                  className="medias-detail-swiper" // Additional classes for styling the swiper
                  CardComponent={ImageCard}
                  data={media?.medias}
                  navigation={{
                    nextEl: ".medias-detail-next-slide-button",
                    prevEl: ".medias-detail-prev-slide-button",
                  }}
                />
              </div>
              <div className="media-swiper medias-detail-pagination swiper-pagination mx-auto" />
            </>
          )}
          <Separator className="mx-auto my-5 flex max-w-xl items-center justify-center bg-primary" />
          <div className="flex items-center justify-center font-semibold text-primary">
            {media?.medias[0]?.text}
          </div>
        </div>
      </div>
    </div>
  );
}
