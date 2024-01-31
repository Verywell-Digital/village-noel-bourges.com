import Heading from "@/components/sections/heading"; // Import a shared heading component
import { GET_LAYOUT, GET_SALON_MAP_PAGE } from "@/lib/gql";
import { getGqlData } from "@/utils/get-graphql-data";
import { Metadata } from "next";
import PDFViewer from "@/components/media/pdf-viewer";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGqlData(GET_SALON_MAP_PAGE, "subsiteSalonMapPages");
  const salonMapPageData = data[0];
  return {
    title: salonMapPageData?.seo[0]?.meta_Title,
    description: salonMapPageData?.seo[0]?.meta_Description,
  };
}

async function Page() {
  const data = await getGqlData(GET_SALON_MAP_PAGE, "subsiteSalonMapPages");
  const salonMapPageData = data[0];

  return (
    salonMapPageData && (
      <div className="container flex flex-col space-y-20 pb-32">
        <section className="w-full pt-8">
          <div className="flex flex-col justify-between justify-items-center space-y-2 lg:flex-row lg:items-center lg:space-y-0">
            <Heading
              className="font-bold"
              isHtml
              title={salonMapPageData?.title}
            />
          </div>
        </section>
        <section className="rounded-2xl bg-card lg:p-10">
          {salonMapPageData?.pdf?.data?.attributes.url &&
          !salonMapPageData?.pdf?.data?.attributes.url.includes("dummy") ? (
            <PDFViewer file={salonMapPageData?.pdf?.data?.attributes} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: salonMapPageData?.notAvailableMessage || "" }} className="mx-auto flex w-full max-w-4xl p-5 font-title text-xl font-bold text-accent lg:text-xl" />
          )}
        </section>
      </div>
    )
  );
}

export default Page;
