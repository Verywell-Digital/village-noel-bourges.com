import React from "react";
import Heading from "@/components/sections/heading"; // Import a shared heading component
import LogoGrid from "./logo-section"; // Import a shared heading component
import { GET_PARTNER_PAGE } from "@/lib/gql";
import { getGqlData } from "@/utils/get-graphql-data";
import { Metadata } from "next";
import Loading from "@/components/loading";

// export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGqlData(GET_PARTNER_PAGE, "subsitePartnerPages");
  const partnerPageData = data[0];
  return {
    title: partnerPageData?.seo[0]?.meta_Title,
    description: partnerPageData?.seo[0]?.meta_Description,
  };
}

async function Page() {
  const data = await getGqlData(GET_PARTNER_PAGE, "subsitePartnerPages");
  const partnerPageData = data[0];
  const logoPartner = data.map((d) => d.logoPartner);
  const logoPartnerData = logoPartner[0];

  if (data[0] === undefined) {
    return (
      <Loading />
    );
  }

  return (
    <div className="pb-8 pt-10">
      <section className="container">
        <Heading
          title={partnerPageData.title}
          text={partnerPageData.description}
        />
        <LogoGrid partners={logoPartnerData} />
      </section>
    </div>
  );
}

export default Page;
