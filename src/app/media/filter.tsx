"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function Filter({ medias, handleCategoryChange, activeId }) {
    return (
      <div className="rounded-[40px] bg-card px-8 py-6 sm:rounded-full">
        <ul className="flex flex-wrap">
          {[
            "Voir tout",
            ...Array.from(new Set(medias.map((media) => media?.category?.data?.attributes?.name))).sort(),
          ].map((cat, index) => (
            <li
              onClick={handleCategoryChange}
              key={index}
              data-id={index}
              data-name={cat}
              className={cn(
                "active-color mb-1.5 mr-3.5 mt-1.5 cursor-pointer rounded-[30px] bg-[#e8e8e8] px-5 py-3 hover:bg-primary hover:text-[#F5F5F5]",
                activeId === index ? "active" : ""
              )}
            >
              {cat as string}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
