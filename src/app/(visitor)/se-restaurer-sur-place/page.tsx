import Heading from "@/components/sections/heading"; // Import a shared heading component
import { getRestaurants } from "@/data/faker-data"; // Import functions to generate mock data
import ImageCard from "@/components/cards/image-card"; // Import a card component for images
import WithMedia from "@/components/sections/with-media";
import { GET_DINING_PAGE } from "@/lib/gql";
import { getGqlData } from "@/utils/get-graphql-data";
import { Metadata } from "next";
import Loading from "@/components/loading";

// export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGqlData(GET_DINING_PAGE, "subsiteDiningPages");
  const diningPageData = data[0];
  return {
    title: diningPageData?.seo[0]?.meta_Title,
    description: diningPageData?.seo[0]?.meta_Description,
  };
}

async function Page() {
  // const restaurants = getRestaurants(3); // Get 3 mock images
  const data = await getGqlData(GET_DINING_PAGE, "subsiteDiningPages");
  const diningPageData = data[0];
  const restaurants = data.map((attributes: any) => attributes.sections);
  const restaurantsData = restaurants[0];

  if (data[0] === undefined) {
    return (
      <Loading />
    );
  }

  return (
    <div className="">
      <section className="w-full pt-8">
        <div className="container pb-10">
          <Heading title={diningPageData.title} />
        </div>
        {/* Utilisation de map() pour générer chaque section */}
        {restaurantsData.map((restaurant, index) => (
          <div key={index} className="relative mb-16 w-full pb-10 pt-10">
            <section className="container">
              <WithMedia
                isModal
                displayBackground
                className="z-10"
                medias={restaurant.mediaSwiper.data.map(
                  (d: any) => d.attributes
                )}
                {...restaurant}
              />
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Page;
