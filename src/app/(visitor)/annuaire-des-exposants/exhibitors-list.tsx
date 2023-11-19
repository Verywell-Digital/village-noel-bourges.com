"use client";

import React, { useEffect, useMemo, useState } from "react";
import Title from "@/components/ui/title";
import CardList from "@/components/sections/card-list";
import { ExhibitorCard } from "@/components/cards/exhibitor-card";
import Filter from "./filter";
import { useFilters } from "./useFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function categorizeItems(items) {
  return items.reduce((acc, exhibitor) => {
    const categoryName =
      exhibitor?.category?.data?.attributes?.parent?.data?.attributes.name
    const subCategoryName = exhibitor.category.data.attributes.name;

    if (!acc[categoryName]) {
      acc[categoryName] = {}; //accumulate result from reduce
    }

    if (!acc[categoryName][subCategoryName]) {
      acc[categoryName][subCategoryName] = [];
    }

    acc[categoryName][subCategoryName].push(exhibitor);
    return acc;
  }, {});
}

export default function ExhibitorsList({ data }) {
  const [allCategories, setAllCategories] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const [isInitialDataEmpty, setInitialDataEmpty] = useState(true);

  // categorize data
  // useEffect(() => {
  //   if (Array.isArray(data)) {
  //     setAllCategories(categorizeItems(data));
  //     setLoading(false);
  //   }
  // }, [data]);
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setAllCategories(categorizeItems(data));
      setLoading(false);
      setInitialDataEmpty(false);
    } else {
      setInitialDataEmpty(true);
    }
  }, [data]);

  // call filter function
  const { filters, setFilters, filteredItems, resetFilters } = useFilters(
    data,
    {
      category: "category.data.attributes.parent.data.attributes.name",
      subCategory: "category.data.attributes.name",
    }
  );

  // filtered data
  const categories = useMemo(() => {
    return categorizeItems(filteredItems);
  }, [filteredItems]);

  return (
    <div className="space-y-5">
      <Filter
        allCategories={allCategories}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />
      {loading ? (
        <div className="container flex items-center space-x-4 p-20">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : Object.keys(categories || {}).length > 0 ? (
        Object.entries(categories).map(
          ([categoryName, subCategories], index) => {
            return (
              Object.keys(subCategories).length > 0 && (
                <div
                  className={`py-5 ${index % 2 === 0 ? "" : "bg-card"}`}
                  key={categoryName}
                >
                  {/* The condition "index % 2 === 0" checks whether the index is even. % is modulo */}
                  <div className="container">
                    <Title className="w-fit pr-4 text-accent" level={2} isHTML>
                      {categoryName}
                    </Title>

                    {Object.entries(subCategories as any).map(
                      ([subCategoryName, exhibitors]: any) => {
                        return (
                          exhibitors.length > 0 && (
                            <div key={subCategoryName}>
                              <div className="relative inline-flex w-full max-w-5xl items-center space-x-7">
                                <Title
                                  className="!m-0 flex w-fit py-5 text-primary"
                                  level={3}
                                  isHTML
                                >
                                  {subCategoryName}
                                </Title>
                                <Separator className="flex bg-primary" />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                <CardList
                                  className="pr-5"
                                  cardClassName={`my-5 ${
                                    index % 2 === 0 ? "" : "bg-white"
                                  }`}
                                  CardComponent={ExhibitorCard}
                                  data={exhibitors as any}
                                />
                              </div>
                            </div>
                          )
                        );
                      }
                    )}
                  </div>
                </div>
              )
            );
          }
        )
      ) : isInitialDataEmpty ? (
        <div className="mx-auto flex w-full max-w-4xl justify-center p-5 font-title text-xl font-bold text-accent lg:text-3xl">
          La liste des exposants n’est pas encore disponible, merci de consulter
          cette page ultérieurement.
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-4xl justify-center p-5 text-justify font-title text-3xl font-bold text-accent lg:text-3xl">
          Aucun résultats
        </div>
      )}
    </div>
  );
}
