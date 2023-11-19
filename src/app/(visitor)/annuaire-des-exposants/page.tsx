import Title from "@/components/ui/title";
import { GET_EXHIBITOR_CONTENT, GET_EXHIBITOR_DIRECTORY_PAGE } from "@/lib/gql";
import { getGqlData } from "@/utils/get-graphql-data";
import ExhibitorsList from "./exhibitors-list";
import { Metadata } from "next";

// Set a revalidation interval for the data (in seconds)
// export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGqlData(
    GET_EXHIBITOR_DIRECTORY_PAGE,
    "subsiteExhibitorDirectoryPages"
  );
  const exhibitorDirectoryPageData = data[0];

  return {
    title: exhibitorDirectoryPageData?.seo[0]?.meta_Title,
    description: exhibitorDirectoryPageData?.seo[0]?.meta_Description,
  };
}

export default async function Page() {
  const data = await getGqlData(
    GET_EXHIBITOR_DIRECTORY_PAGE,
    "subsiteExhibitorDirectoryPages"
  );
  const exhibitorDirectoryPageData = data[0];

  const exhibitorsContentData = await getGqlData(
    GET_EXHIBITOR_CONTENT,
    "subsiteExhibitorContents"
  );

  return (
    <div className="mb-20 space-y-5">
      <div className="container">
        <Title className="font-bold">{exhibitorDirectoryPageData.title}</Title>
      </div>
      <ExhibitorsList data={exhibitorsContentData} />
    </div>
  );
}
