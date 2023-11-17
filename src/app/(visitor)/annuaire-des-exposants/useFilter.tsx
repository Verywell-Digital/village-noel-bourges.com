import { useMemo, useState } from "react";

const getNestedObject = (nestedObj: any, pathArr: any[]) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};

export function useFilters(
  items: any,
  filterProps: any,
  initialFilters = {
    selectedCategory: "",
    selectedSubCategory: "",
    searchTerm: "",
  }
) {
  const [filters, setFilters] = useState(initialFilters);

  const resetFilters = () => setFilters(initialFilters);

  const searchTermWords = filters.searchTerm.toLowerCase().split(" ");

  const filteredItems = useMemo(() => {
    return items.filter((item: any) => {
      return (
        (filters.selectedCategory === "" ||
          getNestedObject(item, filterProps.category.split(".")) ===
            filters.selectedCategory) &&
        (filters.selectedSubCategory === "" ||
          getNestedObject(item, filterProps.subCategory.split(".")) ===
            filters.selectedSubCategory) &&
        (filters.searchTerm === "" ||
          searchTermWords.some(
            (word: string) =>
              (typeof item.title === "string" &&
                item.title.toLowerCase().includes(word)) ||
              (typeof item.description === "string" &&
                item.description.toLowerCase().includes(word))
          ))
      );
    });
  }, [items, filters, searchTermWords, filterProps]);

  return { filters, setFilters, filteredItems, resetFilters };
}
