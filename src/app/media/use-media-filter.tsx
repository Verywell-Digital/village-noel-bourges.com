import { useState, useMemo } from "react";

export function useMediaFilter(medias: any[]) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  function handleCategoryChange(e: any) {
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    setActiveId(Number(id));
    setSelectedCategory(name);
  }

  function getFilteredList() {
    if (!selectedCategory || selectedCategory === "Voir tout") {
      return medias;
    }
    return medias.filter((media) => media.category?.data?.attributes.name === selectedCategory);
  }

  const filteredList = useMemo(getFilteredList, [selectedCategory, medias]);

  return {
    activeId,
    filteredList,
    handleCategoryChange,
  };
}
