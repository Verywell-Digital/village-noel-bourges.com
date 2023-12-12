"use client";

import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import Title from "../ui/title";
import ButtonIcon from "../ui/button-icon";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
// import { getImages } from "@/data/faker-data";

interface ExhibitorCardProps {
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  [key: string]: any; //any other props
  //   popup: boolean;
}

type CardProps = React.ComponentProps<typeof Card> & ExhibitorCardProps;

export function ExhibitorCard({
  className,
  isSelected,
  setIsSelected,
  tagValue,
  tagTitle,
  buttonLabel,
  ...props
}: CardProps) {
  const truncatedDescription =
    props?.description?.length > 100
      ? props?.description.substring(0, 100) + "..."
      : props?.description;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  // const image = getImages(1);
  // const placeholderImage = image[0].url;
  const placeholderImage = "/images/placeholder-large-h.png";

  return (
    <Dialog>
      <DialogTrigger className="text-left rounded-2xl">
        <Card
          className={cn(
            "flex h-96 flex-col justify-between rounded-2xl border-none shadow-none",
            isSelected ? "!bg-accent" : "",
            className
          )}
          {...props}
          onMouseEnter={() => setIsSelected(true)}
          onMouseLeave={() => setIsSelected(false)}
        >
          <CardHeader>
            {tagValue && (
              <div
                className={`mb-auto flex justify-end justify-items-center ${
                  isSelected ? "text-gray-200" : "text-primary"
                }`}
              >
                <span className=" hover:main-color pr-2.5 text-base font-normal">
                  {tagTitle ?? "Stand"}
                </span>
                <span
                  className={`inline-block rounded-xl border px-1.5 py-0.5 text-sm font-semibold uppercase ${
                    isSelected ? "border-gray-200" : "border-primary"
                  }`}
                >
                  {tagValue ?? "A00"}
                </span>
              </div>
            )}
            <div className="flex h-32">
              {props?.plan?.data?.attributes.url && (
                <Image
                  src={props?.plan?.data?.attributes.url ?? placeholderImage}
                  alt={
                    props?.plan?.data?.attributes.alternativeText ??
                    "animation image"
                  }
                  width={300}
                  height={200}
                  className="h-full w-full rounded-md object-cover object-center"
                  sizes="(max-width: 768px) 50vw"
                  quality={75}
                  priority={false}
                />
              )}
            </div>
          </CardHeader>
          <CardContent className="py-0">
            <h2
              className={`mb-4 font-title text-xl font-semibold uppercase ${
                isSelected ? "text-gray-100" : ""
              }`}
            >
              {props?.title}
            </h2>
            <p
              className={`text-base font-normal ${
                isSelected ? "text-gray-300" : ""
              }`}
            >
              {truncatedDescription}
            </p>
          </CardContent>
          <CardFooter>
            {isSelected && (
              <Button
                isDialog
                variant="ghost"
                className="mt-4 p-0 text-secondary"
              >
                {buttonLabel}
                <ButtonIcon variant="accent" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className="h-[80vh] w-full rounded-lg md:p-10">
          <DialogHeader>
            <div className="flex justify-items-center pb-2 pr-12 text-primary">
              <span className="pr-2.5 text-base font-normal">
                {tagTitle ?? "Stand"}
              </span>
              <span className="inline-block rounded-xl border border-primary px-1.5 py-0.5 text-sm font-semibold uppercase">
                {tagValue ?? "A00"}
              </span>
            </div>
            <Title
              className="main-color mb0 max-w-xl pr-12 font-semibold"
              level={2}
              isHTML
            >
              {props?.title ?? "Titre"}
            </Title>
          </DialogHeader>
          <div className="my-5 inline-block rounded-lg bg-card px-4 py-2 text-base font-medium text-primary">
            {props.category.data?.attributes.name}
          </div>
          <DialogDescription className="pb-5 text-base font-normal">
            {props?.description}
          </DialogDescription>
          {props?.plan?.data?.attributes.url && (
            <DialogFooter>
              <div className="relative w-full">
                {isFullscreen ? (
                  <div
                    className="fixed left-[50%] top-[50%] z-50 m-auto flex h-screen w-screen translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-black bg-opacity-80"
                    onClick={() => setIsFullscreen(false)}
                  >
                    <Image
                      src={props?.plan?.data?.attributes.url}
                      alt={
                        props?.plan?.data?.attributes.alternativeText ??
                        "exposant popup image"
                      }
                      layout="fill"
                      objectFit="contain"
                      className="cursor-zoom-out rounded-md"
                      quality={100}
                    />
                  </div>
                ) : (
                  <Image
                    src={props?.plan?.data?.attributes.url}
                    alt={
                      props?.plan?.data?.attributes.alternativeText ??
                      "exposant popup image"
                    }
                    width={1400}
                    height={900}
                    className="cursor-zoom-in rounded-md object-cover"
                    quality={100}
                    onClick={handleImageClick}
                  />
                )}
              </div>
            </DialogFooter>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
