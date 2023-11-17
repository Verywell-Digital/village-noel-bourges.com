"use client";

import React from "react";

import Title from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DocList({ ...props }) {
  return (
    <div className="relative mb-16 w-full pb-10 pt-10">
      <div className="container">
        <section className="relative z-10 w-full">
          <Title
            className="pl-6 font-semibold uppercase sm:pl-8 md:pl-10 lg:pl-14"
            level={2}
            isHTML
          >
            {props.titleH2}
          </Title>
          {props?.filesDownload?.map((doc, index) => (
            <div
              key={index}
              className="pdf-wrapper relative mb-4 mt-4 flex w-full flex-wrap items-center justify-between rounded-lg bg-white px-6 sm:px-8 md:px-10"
            >
              <span className="my-2.5 w-6/12 text-lg font-semibold md:text-xl lg:text-2xl">
                {doc.fileTitle}
              </span>
              <span className="text-basefont-bold my-2.5 pl-5 pr-5 uppercase text-primary">
                PDF
              </span>
              {doc.document.data?.attributes.url && (
                <Link
                  href={doc.document.data?.attributes.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default">
                    Télécharger
                    <ButtonIcon />
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </section>
      </div>
      <div className="absolute left-0 top-0 h-full w-full bg-card xl:w-[97%] xl:rounded-r-3xl 2xl:w-[90%]"></div>
    </div>
  );
}
