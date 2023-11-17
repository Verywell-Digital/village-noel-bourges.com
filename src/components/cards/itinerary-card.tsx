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
import Link from "next/link";
import { FaCar, FaTrainSubway, FaBusSimple } from "react-icons/fa6";

interface ItineraryCardProps {
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  [key: string]: any; 
}

type CardProps = React.ComponentProps<typeof Card> & ItineraryCardProps;

export function ItineraryCard({
  className,
  icon,
  title,
  description,
  button,
  url,
  isSelected,
  setIsSelected,
  ...props
}) {
  let IconComponent;
  switch (icon) {
    case "car":
      IconComponent = FaCar;
      break;
    case "train":
      IconComponent = FaTrainSubway;
      break;
    case "bus":
      IconComponent = FaBusSimple;
      break;
    default:
      IconComponent = null;
      break;
  }
  return (
    <Card
      className={cn(
        "flex h-full flex-col justify-between space-y-5 rounded-2xl border-none bg-white p-10 shadow-none",
        isSelected ? "bg-primary" : "",
        className
      )}
      {...props}
      onMouseEnter={() => setIsSelected(true)}
      onMouseLeave={() => setIsSelected(false)}
    >
      <CardHeader className="flex p-0">
        <div
          className={`w-fit rounded-full ${
            isSelected
              ? "text-secondary ring-secondary"
              : "text-primary ring-primary"
          } p-3 ring-1`}
        >
          {IconComponent && <IconComponent className="w-9 h-9" />}
        </div>
      </CardHeader>
      <CardContent className="flex h-full flex-col items-start justify-start p-0">
        <Title
          className={`mb-4 ${isSelected ? "text-gray-100" : ""}`}
          level={3}
          isHTML
        >
          {title}
        </Title>
        <div
          className={`${
            isSelected
              ? "mb-4 text-base text-white opacity-80"
              : "mb-auto pb-4 text-base"
          }`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>
      <CardFooter>
        <Link href={url || "#"} target="_blank" rel="noopener noreferrer">
          <Button
            isDialog
            variant="ghost"
            className={`${isSelected ? "text-secondary" : ""} duration-0`}
          >
            {button || "Button"}
            <ButtonIcon variant={`${isSelected ? "accent" : "default"}`} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
