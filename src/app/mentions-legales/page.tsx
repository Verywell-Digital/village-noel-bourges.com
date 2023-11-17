import Heading from "@/components/sections/heading"; // Import a shared heading component
import { GET_LEGAL_NOTICES_PAGE } from "@/lib/gql";
import { getGqlData } from "@/utils/get-graphql-data";
import { Metadata } from "next";

// export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGqlData(
    GET_LEGAL_NOTICES_PAGE,
    "subsiteLegalNoticePages"
  );
  const legalNoticesPageData = data[0];
  return {
    title: legalNoticesPageData?.seo?.meta_Title,
    description: legalNoticesPageData?.seo?.meta_Description,
  };
}

async function Page() {
  const data = await getGqlData(
    GET_LEGAL_NOTICES_PAGE,
    "subsiteLegalNoticePages"
  );
  const legalNoticesPageData = data[0];
  return legalNoticesPageData && (
    <div className="container flex flex-col pb-32">
      <section className="w-full ">
        <div className="flex flex-col justify-between justify-items-center lg:flex-row lg:items-center">
          <Heading
            className="font-bold"
            isHtml
            title={legalNoticesPageData.title}
          />
        </div>
      </section>
      <section className="prose-lg">
        <div
          dangerouslySetInnerHTML={{
            __html: legalNoticesPageData?.description || "",
          }}
        />
      </section>
    </div>
  );
}

export default Page;
