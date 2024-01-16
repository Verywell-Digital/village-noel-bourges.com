import Heading from "@/components/sections/heading"; // Import a shared heading component
import { GET_LAYOUT, GET_SALON_MAP_PAGE } from "@/lib/gql";
import { getGqlData } from "@/utils/get-graphql-data";
import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import { Metadata } from "next";
import PDFViewer from "@/components/media/pdf-viewer";

// export const revalidate = 60;

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

  const dataLayout = await getGqlData(GET_LAYOUT, "subsiteLayouts");
  const seo = dataLayout[0].seo;

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
            {/* {salonMapPageData.pdf?.data.attributes.url &&
            !salonMapPageData.pdf?.data.attributes.url.includes("dummy") && (
              <a
                href={salonMapPageData.pdf?.data.attributes.url}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="flex h-14 w-fit min-w-max flex-row justify-between text-sm"
                  size="lg"
                >
                  {salonMapPageData.download.label}
                  <ButtonIcon variant="secondary" />
                </Button>
              </a>
            )} */}
          </div>
        </section>
        <section className="rounded-2xl bg-card lg:p-10">
          {salonMapPageData?.pdf?.data?.attributes.url &&
          !salonMapPageData?.pdf?.data?.attributes.url.includes("dummy") ? (
            <PDFViewer file={salonMapPageData?.pdf?.data?.attributes} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: salonMapPageData?.notAvailableMessage || "" }} className="mx-auto flex w-full max-w-4xl p-5 font-title text-xl font-bold text-accent lg:text-xl">
              {/* Le plan de l&lsquo;édition {new Date().getFullYear()} du{" "}
              {seo?.meta_Title} n&lsquo;est pas encore disponible, merci de
              consulter cette page ultérieurement. */}
            </span>
          )}
        </section>
      </div>
    )
  );
}

export default Page;
