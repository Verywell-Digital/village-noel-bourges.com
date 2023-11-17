import React from "react";
import Heading from "@/components/sections/heading";
import MediasList from "./medias-list";
import { getMedias } from "@/data/faker-data";
import { GET_MEDIAS, GET_MEDIA_PAGE } from "@/lib/gql";
import { getGqlData } from "@/utils/get-graphql-data";
import { Metadata } from "next";

// export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGqlData(GET_MEDIA_PAGE, "subsiteMediaPages");
  const mediaPageData = data[0];
  return {
    title: mediaPageData?.seo[0]?.meta_Title,
    description: mediaPageData?.seo[0]?.meta_Description,
  };
}

async function Page() {
  // const medias = getMedias(20);
  const data = await getGqlData(GET_MEDIA_PAGE, "subsiteMediaPages");
  const mediaPageData = data[0];

  const mediasData = await getGqlData(GET_MEDIAS, "subsiteMediaContents");

  return (
    <div key="any" className="space-y-40">
      <section className="container w-full space-y-20">
        <Heading title={mediaPageData?.title} />
        <MediasList medias={mediasData} />
      </section>
    </div>
  );
}

export default Page;
