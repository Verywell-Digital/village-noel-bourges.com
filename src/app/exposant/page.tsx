import React from "react";
import Heading from "@/components/sections/heading"; // Import a shared heading component
import WithMedia, { WithMediaProps } from "@/components/sections/with-media";
import DocList from "./doc-list";
import { getGqlData } from "@/utils/get-graphql-data";
import { GET_EXHIBITOR_PAGE } from "@/lib/gql";
import { ContactForm } from "@/components/form/contact-form";
import { Metadata } from "next";

// export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const exhibitorData = await getGqlData(
    GET_EXHIBITOR_PAGE,
    "subsiteExhibitorPages"
  );

  const data = exhibitorData[0];
  return {
    title: data?.seo?.meta_Title,
    description: data?.seo?.meta_Description,
  };
}

async function Page() {
  const exhibitorData = await getGqlData(
    GET_EXHIBITOR_PAGE,
    "subsiteExhibitorPages"
  );

  const data = exhibitorData[0];

  const dataMediaSection = data?.sections;
  return (
    <div className="w-full space-y-20 pt-8">
      <div className="container">
        <Heading title={data?.title} />
      </div>
      <div className="container flex flex-col space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0">
        <div
          dangerouslySetInnerHTML={{ __html: data?.description || "" }}
          className="pdf-arrow flex w-full items-center justify-center p-5 -indent-2 lg:w-1/2"
        />
        <div className="w-full rounded-xl bg-card p-10 lg:w-1/2">
          <ContactForm
            siteOrigin="salon-vins-gastronomie-bourges.com"
            emailDestinationAddress={data.emailDestinationAddress}
            emailSubject={data.emailSubject}
          />
        </div>
      </div>
      <DocList {...data} />
      {/* Utilisation de map() pour générer chaque section */}
      {dataMediaSection.map(
        (
          section: React.JSX.IntrinsicAttributes & WithMediaProps<unknown>,
          index: React.Key
        ) => (
          <div key={index} className="relative mb-16 w-full pb-10 pt-10">
            <section className="container">
              <WithMedia
                displayBackground
                displayButton={false}
                className="z-10"
                medias={[section?.image?.file?.data?.attributes?.url]}
                {...section}
              />
            </section>
          </div>
        )
      )}
    </div>
  );
}

export default Page;
