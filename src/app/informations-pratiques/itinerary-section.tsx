import { ItineraryCard } from "@/components/cards/itinerary-card";
import CardList from "@/components/sections/card-list";
import Title from "@/components/ui/title";

export default function ItinerarySection({ accessSection }) {
  return (
    <>
      <div className="relative z-10">
        <Title className="font-semibold uppercase" level={2} isHTML>
          {accessSection.title}
        </Title>
        <div className="-ml-[10px] -mr-[10px] flex flex-wrap">
          <CardList
            className="w-full pb-2 pt-2 md:w-1/2 md:p-2 lg:w-1/3"
            CardComponent={ItineraryCard}
            data={accessSection.accessCard}
          />
        </div>
      </div>
    </>
  );
}
