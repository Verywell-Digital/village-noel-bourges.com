import { getAnimations } from "@/data/faker-data";
import Heading from "@/components/sections/heading"; // Import a shared heading component
import ImageCard from "@/components/cards/image-card"; // Import a card component for images
import WithMedia from "@/components/sections/with-media";
import Information from "./information";
import { getGqlData } from "@/utils/get-graphql-data";
import { GET_ANIMATION_PAGE } from "@/lib/gql";
import { Metadata } from "next";
import { Suspense } from "react";

// export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGqlData(
    GET_ANIMATION_PAGE,
    "subsiteAnimationProgramPages"
  );
  const animationPagesData = data[0];
  return {
    title: animationPagesData?.seo[0]?.meta_Title,
    description: animationPagesData?.seo[0]?.meta_Description,
  };
}

export default async function Page() {
  // const animationsData = getAnimations(10); // Get 10 mock animations
  const data = await getGqlData(
    GET_ANIMATION_PAGE,
    "subsiteAnimationProgramPages"
  );
  const animationPagesData = data[0];
  const animations = data.map((attributes: any) => attributes?.sections);
  const animationsData = animations[0];

  return (
    <div className="w-full space-y-10 py-8">
      <div className="container flex w-full flex-col items-start justify-between justify-items-center lg:flex-row">
        <Heading className="flex" title={animationPagesData?.title} />
        <div className="flex max-w-xl">{animationPagesData?.description}</div>
      </div>
      {/* Use map() to generate each section */}
      {animationsData && animationsData.length > 0 ? (
        animationsData.map((animation, index) => (
          <div key={index}>
            <div className="pt-10" id={animation.id} />
            <div
              className={`relative mb-16 w-full pb-10 pt-10 ${animation?.position}`}
            >
              <section className="container">
                <WithMedia
                  displayBackground
                  displayButton={false}
                  medias={animation.image.data.map(
                    (d: any) => d.attributes
                  )}
                  className="z-10"
                  {...animation}
                >
                  <Suspense>
                    <Information {...animation} />
                  </Suspense>
                </WithMedia>
              </section>
            </div>
          </div>
        ))
      ) : (
        <div className="mx-auto flex w-full max-w-4xl justify-center p-5 font-title text-xl font-bold text-accent lg:text-3xl">
          La liste des animations n’est pas encore disponible, merci de
          consulter cette page ultérieurement
        </div>
      )}
    </div>
  );
}
