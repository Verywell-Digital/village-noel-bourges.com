import React from "react";
import InformationSection from "./information-section";
import OrganizationSection from "./organization-section";
import ItinerarySection from "./itinerary-section";
import { getGqlData } from "@/utils/get-graphql-data";
import { GET_INFOS_PAGE } from "@/lib/gql";
import Title from "@/components/ui/title";
import { Metadata } from "next";

// export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const infosData = await getGqlData(
    GET_INFOS_PAGE,
    "subsitePracticalInfoPages"
  );

  const data = infosData[0];

  return {
    title: data?.seo[0]?.meta_Title,
    description: data?.seo[0]?.meta_Description,
  };
}

async function Page() {
  const infosData = await getGqlData(
    GET_INFOS_PAGE,
    "subsitePracticalInfoPages"
  );

  const data = infosData[0];
  return data && (
    <div className="space-y-12">
      <section className="container">
        <Title className="font-bold uppercase" level={1} isHTML>
          {data?.title}
        </Title>
        <InformationSection mainSection={data?.mainSection} />
      </section>

      <section className="container">
        <OrganizationSection organization={data?.organization} />
      </section>

      <section className="relative mb-16 w-full pb-10 pt-10">
        <div className="container">
          <ItinerarySection accessSection={data?.accessSection} />
          <div className="absolute left-0 top-0 h-full w-full bg-card xl:w-[97%] xl:rounded-r-3xl 2xl:w-[90%]"></div>
        </div>
      </section>
    </div>
  );
}

export default Page;
