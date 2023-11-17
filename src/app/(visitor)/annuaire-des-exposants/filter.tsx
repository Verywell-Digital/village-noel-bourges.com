"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function Filter({ allCategories, filters, setFilters, resetFilters }) {
  const { selectedCategory, selectedSubCategory, searchTerm } = filters;
  const [reset, setReset] = useState(false);

  const handleCategoryChange = (value: any) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      selectedCategory: value,
      selectedSubCategory: "",
    }));
    setReset(false);
  };

  const handleSubCategoryChange = (value: any) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      selectedSubCategory: value,
    }));
    setReset(false);
  };

  const handleSearchChange = (e: { target: { value: any } }) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      searchTerm: e.target.value,
    }));
  };

  return (
    <div className="container flex flex-wrap justify-between rounded-[40px] bg-card px-8 py-6 sm:rounded-full">
      {/* Filter by category */}
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className="my-1 h-[59px] w-[300px] rounded-full px-5">
          {reset ? (
            <option value="">Catégories</option>
          ) : (
            <SelectValue placeholder="Catégories" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.keys(allCategories).map((categoryName, i) => (
              <SelectItem key={i} value={categoryName}>
                {categoryName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Filter by sub-category */}
      <Select key={selectedCategory} onValueChange={handleSubCategoryChange}>
        <SelectTrigger className="my-1 h-[59px] w-[300px] rounded-full px-5">
          {reset ? (
            <option value="">Sous-catégories</option>
          ) : (
            <SelectValue placeholder="Sous-catégories" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {!selectedCategory ? (
              <SelectItem disabled value="">
                Veuillez sélectionner une catégorie
              </SelectItem>
            ) : (
              Object.keys(allCategories[selectedCategory]).map(
                (subCategoryName, i) => (
                  <SelectItem key={i} value={subCategoryName}>
                    {subCategoryName}
                  </SelectItem>
                )
              )
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Search */}
      <div className="relative rounded-full">
        <Input
          className="my-1 h-[59px] w-[300px] rounded-full px-5"
          value={searchTerm}
          onChange={handleSearchChange}
          type="text"
          placeholder="Rechercher..."
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 transform">
          <Search className=" text-primary" />
        </span>
      </div>

      {/* Reset filters */}
      <button
        className="text-xs text-accent underline"
        type="button"
        onClick={() => {
          resetFilters();
          setReset(true);
        }}
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}

export default Filter;
