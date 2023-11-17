// Import necessary modules and components
import {
  GET_HOMEPAGE,
  GET_ANIMATION_PAGE,
  GET_EXHIBITOR_CONTENT,
} from "@/lib/gql"; // Import a GraphQL query
import { getGqlData } from "@/utils/get-graphql-data"; // Import a utility function
import { getImages, getExhibitors, getAnimations } from "@/data/faker-data"; // Import functions to generate mock data
import Heading from "@/components/sections/heading"; // Import a shared heading component
import CardListSwiper from "@/components/sections/card-list-swiper"; // Import a swiper component for card lists
import { ExhibitorCard } from "@/components/cards/exhibitor-card"; // Import a card component for exhibitors
import { AnimationCard } from "@/components/cards/animation-card"; // Import a card component for animations
import WithMedia from "@/components/sections/with-media"; // Import a swiper component for media
import ButtonIcon from "@/components/ui/button-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Title from "@/components/ui/title";

// Set a revalidation interval for the data (in seconds)
// export const revalidate = 60;

// Define the main component
export default async function HomePage() {
  // Fetch data from GraphQL using the specified query
  const homePagesData = await getGqlData(GET_HOMEPAGE, "subsiteHomePages");

  const exhibitorSection = homePagesData.map(
    (attributes: any) => attributes.exhibitorSection
  );
  const exhibitorSectionData = exhibitorSection[0];

  const lunchSection = homePagesData.map(
    (attributes: any) => attributes.lunchSection
  );
  const lunchSectionData = lunchSection[0];

  const animationSection = homePagesData.map(
    (attributes: any) => attributes.animationSection
  );
  const animationSectionData = animationSection[0];

  const animationsPagesData = await getGqlData(
    GET_ANIMATION_PAGE,
    "subsiteAnimationProgramPages"
  );
  const exhibitorsContentData = await getGqlData(
    GET_EXHIBITOR_CONTENT,
    "subsiteExhibitorContents"
  );

  const limitedExhibitorsContentData = exhibitorsContentData.slice(0, 15);

  const animationsData = animationsPagesData.map((d: any) => d.sections).flat();

  // Generate mock data using faker functions
  // const images = getImages(3); // Get 3 mock images
  // const exhibitorsContentData = getExhibitors(10); // Get 10 mock exhibitors
  // const animationsData = getAnimations(10); // Get 10 mock animations

  return (
    <div className="space-y-10 sm:space-y-24">
      {/* Iterate over the fetched data */}
      <div key="any" className="space-y-40">
        {/* Exhibitors section */}
        <section className="container w-full">
          <div className="space-y-8 overflow-x-visible">
            {/* Display a heading for the exhibitors section */}
            <Heading
              isHtml
              title={exhibitorSectionData.title}
              text={exhibitorSectionData.description}
              altText={exhibitorSectionData.altText}
            >
              {exhibitorSectionData.button[0].url && (
                <>
                  <Link href={exhibitorSectionData.button[0].url}>
                    <Button className="w-fit" size="lg">
                      {exhibitorSectionData.button[0].label}
                      <ButtonIcon variant="secondary" />
                    </Button>
                  </Link>
                  <div className=" flex justify-end">
                    <div className="relative w-36">
                      <div
                        onClick={undefined}
                        className="exhibitor-prev-slide-button swiper-button-prev"
                      ></div>
                      <div
                        onClick={undefined}
                        className="exhibitor-next-slide-button swiper-button-next"
                      ></div>
                    </div>
                  </div>
                </>
              )}
            </Heading>
            {
              limitedExhibitorsContentData && limitedExhibitorsContentData.length > 0 ? (
                <div className="flex-wrap overflow-hidden lg:-mr-[500px]">
                  {/* Use a swiper component to display exhibitor cards */}
                  <CardListSwiper
                    className="exhibitor-swiper" // Additional classes for styling the swiper
                    itemPerRow={6} // Number of exhibitor cards per row
                    CardComponent={ExhibitorCard} // Component to use for each exhibitor card
                    cardClassName="" // Additional classes for styling the exhibitor cards
                    data={limitedExhibitorsContentData.map((exhibitor: any) => ({
                      ...exhibitor,
                    }))} // Data source for exhibitor cards
                    navigation={{
                      nextEl: ".exhibitor-next-slide-button",
                      prevEl: ".exhibitor-prev-slide-button",
                    }}
                    // data={exhibitors} //Fake data for testing
                  />
                </div>
              ) : null
              // <span className="mx-auto flex w-full max-w-4xl p-5 font-title text-xl font-bold text-accent lg:text-xl">
              //   La liste des exposants n’est pas encore disponible, merci de consulter cette page ultérieurement.
              // </span>
            }
            {exhibitorSectionData.button[1].url && (
              <Link
                className="flex justify-end pt-5"
                href={exhibitorSectionData.button[1].url}
              >
                <Button variant="ghost" className="w-fit" size="default">
                  {exhibitorSectionData.button[1].label}
                  <ButtonIcon variant="default" />
                </Button>
              </Link>
            )}
          </div>
        </section>

        {/* Lunch section with media swiper */}
        <div className="relative w-full">
          <section className="container py-14 lg:py-16">
            {/* Use a swiper component to display media cards */}
            <WithMedia
              className="z-10" // Additional classes for styling the swiper
              layout={{ position: "default" }}
              medias={lunchSectionData.mediaSwiper.data.map(
                (d: any) => d.attributes
              )} // Data source for images cards
              title={lunchSectionData.title} // Data source for title section
              button={{
                label: lunchSectionData.button.label,
                url: lunchSectionData.button.url || "/",
              }}
            >
              <p>{lunchSectionData.description}</p>
            </WithMedia>
          </section>
          {/* Add a decorative element */}
          <div className="bg-text-img-wrap absolute inset-0 h-full bg-neutral-100 xl:w-[97%] xl:rounded-r-3xl 2xl:w-[95%]" />
        </div>

        {/* Animations section */}
        <section className="container w-full pb-20">
          <div className="space-y-8 overflow-x-visible">
            {/* Display a heading for the animations section */}
            <Heading
              isHtml
              titleLevel={2}
              title={animationSectionData.title}
              text={animationSectionData.description}
            >
              <div className="flex w-full flex-row justify-between">
                {animationSectionData.button[0].url && (
                  <Link
                    className="flex"
                    href={animationSectionData.button[0].url}
                  >
                    <Button className="w-fit" size="lg">
                      {animationSectionData.button[0].label}
                      <ButtonIcon variant="secondary" />
                    </Button>
                  </Link>
                )}
                <div className=" flex">
                  <div className="relative w-36">
                    <div
                      onClick={undefined}
                      className="animation-prev-slide-button swiper-button-prev"
                    ></div>
                    <div
                      onClick={undefined}
                      className="animation-next-slide-button swiper-button-next"
                    ></div>
                  </div>
                </div>
              </div>
            </Heading>
            {animationsData && animationsData.length > 0 ? (
              <div className="relative flex-wrap lg:-mr-[300px]">
                {/* Use a swiper component to display animation cards */}
                <CardListSwiper
                  transitionEffect
                  className="animation-swiper" // Additional classes for styling the swiper
                  itemPerRow={5} // Number of exhibitor cards per row
                  CardComponent={AnimationCard} // Component to use for each exhibitor card
                  cardClassName="" // Additional classes for styling the exhibitor cards.
                  data={animationsData.map((animation: any, index: number) => ({
                    ...animation,
                    index: index,
                  }))} // Data source for animation cards
                  navigation={{
                    nextEl: ".animation-next-slide-button",
                    prevEl: ".animation-prev-slide-button",
                  }}
                />
              </div>
            ) : null
            // <span className="mx-auto flex w-full max-w-4xl p-5 font-title text-xl font-bold text-accent lg:text-xl">
            //   La liste des animations n’est pas encore disponible, merci de
            //   consulter cette page ultérieurement.
            // </span>
            }
          </div>
        </section>
      </div>
    </div>
  );
}
