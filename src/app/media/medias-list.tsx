"use client"

import React from "react";
import MediaListSwiper from "@/components/sections/media-list-swiper";
import { MediaCard } from "@/components/cards/media-card";
import { useMediaFilter } from "./use-media-filter";
import Filter from "./filter";

function MediasList({ medias }) {
  const { activeId, filteredList, handleCategoryChange } = useMediaFilter(medias);

  return (
    <div className="flex-wrap ">
      <Filter
        medias={medias}
        activeId={activeId}
        handleCategoryChange={handleCategoryChange}
      />
      <MediaListSwiper
        className="medias-swiper mb-10 mt-10 pb-24 md:mb-16 md:mt-16"
        itemPerRow={4}
        CardComponent={MediaCard}
        cardClassName=""
        data={filteredList}
      />
    </div>
  );
}

export default MediasList;

