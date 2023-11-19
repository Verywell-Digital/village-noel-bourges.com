import Loading from "@/components/loading";
import Heading from "@/components/sections/heading"; // Import a shared heading component
import { GET_PRIVACY_POLICY_PAGE } from "@/lib/gql";
import { getGqlData } from "@/utils/get-graphql-data";
import { Metadata } from "next";

// export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGqlData(
    GET_PRIVACY_POLICY_PAGE,
    "subsitePrivacyPolicyPages"
  );
  const privacyPolityPageData = data[0];
  return {
    title: privacyPolityPageData?.seo?.meta_Title,
    description: privacyPolityPageData?.seo?.meta_Description,
  };
}

async function Page() {
  const data = await getGqlData(
    GET_PRIVACY_POLICY_PAGE,
    "subsitePrivacyPolicyPages"
  );
  const privacyPolityPageData = data[0];

  if (data[0] === undefined) {
    return <Loading />;
  }

  return (
    <div className="container flex flex-col pb-32">
      <section className="w-full ">
        <div className="flex flex-col justify-between justify-items-center lg:flex-row lg:items-center">
          <Heading
            className="font-bold"
            isHtml
            title={privacyPolityPageData.title}
          />
        </div>
      </section>
      <section className="prose-lg">
        <div
          dangerouslySetInnerHTML={{
            __html: privacyPolityPageData?.description || "",
          }}
        />
      </section>
    </div>
  );
}

export default Page;
