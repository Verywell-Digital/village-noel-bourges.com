"use client";

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
import Title from "../ui/title";
import ButtonIcon from "../ui/button-icon";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  [key: string]: any; //any other props hack
}

type CardProps = React.ComponentProps<typeof Card> & MediaCardProps;

export function MediaCard({
  className,
  isSelected,
  setIsSelected,
  pdfThumbnail,
  ...props
}: CardProps) {
  const placeholderImage = "/images/placeholder-large-h.png";

  return (
    <>
      <Card
        className={cn(
          "flex !min-h-max flex-col justify-between rounded-2xl border-none shadow-none",
          isSelected ? "bg-card-foreground" : "",
          className
        )}
        {...props}
        onMouseEnter={() => setIsSelected(true)}
        onMouseLeave={() => setIsSelected(false)}
      >
        <CardHeader className="space-y-5">
          <div className="flex h-32">
            {props?.medias[0]?.file?.data?.attributes.url && (
              <Image
                src={
                  pdfThumbnail[0]?.file?.data?.attributes.url ||
                  props?.medias[0]?.file?.data?.attributes.url ||
                  placeholderImage
                }
                alt={
                  props?.medias[0]?.file?.data?.attributes.alternativeText ??
                  "media image"
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

          <div
            className={`flex justify-between ${
              isSelected ? "text-gray-200" : "text-primary"
            }`}
          >
            <span
              className={`inline-block rounded-xl px-1.5 py-0.5 text-sm font-semibold uppercase`}
            >
              {props?.date.toString()}
            </span>

            <span
              className={`inline-block rounded-xl border px-1.5 py-0.5 text-sm font-semibold uppercase ${
                isSelected ? "border-gray-200" : "border-primary"
              }`}
            >
              {props?.category?.data?.attributes.name}
            </span>
          </div>
        </CardHeader>
        <CardContent className="py-0 h-20">
          <Title
            className={`mb-4 ${isSelected ? "text-gray-100" : ""}`}
            level={3}
            isHTML
          >
            {props.name}
          </Title>
        </CardContent>
        <CardFooter>
          {isSelected && (
            <Link href={`/media/${props.slug}`}>
              <Button variant="ghost" className="mt-4 p-0 text-secondary">
                Plus de détails <ButtonIcon variant="accent" />
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
