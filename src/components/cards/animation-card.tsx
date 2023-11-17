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
import { Separator } from "@/components/ui/separator";
import Title from "../ui/title";
import ButtonIcon from "../ui/button-icon";
import { IconContext } from "react-icons/lib";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
// import { getImages } from "@/data/faker-data";

interface AnimationCardProps {
  [key: string]: any; //any other props
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
}

type CardProps = React.ComponentProps<typeof Card> & AnimationCardProps;

export function AnimationCard({
  isSelected = false,
  setIsSelected = () => {},
  className,
  index,
  ...props
}: CardProps) {
  // const formattedDate = format(props.date, "dd/MM/yyyy");
  const cleanAddress = props?.information?.address.replace(
    /<p>|<\/p>|<br>/g,
    ""
  );
  const cleanDate = props?.information?.date.replace(/<p>|<\/p>|<br>/g, "");

  const bgColor = isSelected && "w-full absolute inset-0 bg-white/50";

  // const placeholderImage = getImages(1);
  const placeholderImage = "/images/placeholder-large-h.png";

  return (
    <Card
      className={cn(
        "relative flex min-h-[500px] flex-col justify-between rounded-2xl border-none bg-transparent shadow-none",
        className
      )}
      {...props}
    >
      <div
        className={cn("transition-colors duration-200 ease-linear", bgColor)}
      />
      <CardHeader className="order-[-1] space-y-2">
        <div className="flex h-44">
          {props?.image?.data?.attributes.url && (
            <Image
              src={props?.image?.data?.attributes.url ?? placeholderImage}
              alt={
                props?.image?.data?.attributes.alternativeText ??
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
        <div className="flex min-h-[120px] flex-col justify-evenly space-y-2">
          <div className="flex items-center text-[13px] leading-7 text-primary">
            <IconContext.Provider value={{ className: "text-primary" }}>
              <FaCalendarAlt className="mr-4" />
            </IconContext.Provider>
            {/* {formattedDate} */}
            {/* <p className="text-cyan-500">
              Ask date format because of multiline
            </p> */}
            <span
              className="text-xs font-semibold"
              dangerouslySetInnerHTML={{
                __html: props?.information?.date,
              }}
            />
          </div>
          <div className="flex items-center text-[13px] leading-7 text-primary">
            <IconContext.Provider value={{ className: "text-primary" }}>
              <FaMapMarkerAlt className="mr-4" />
            </IconContext.Provider>
            <span
              className="text-xs font-semibold"
              dangerouslySetInnerHTML={{
                __html: cleanAddress,
              }}
            />
          </div>
          <Separator className=" bg-neutral-500" />
        </div>
      </CardHeader>
      <CardContent>
        <Title className="!m-0 min-h-[80px] h-36 w-full" level={3} isHTML>
          {props.title}
        </Title>
      </CardContent>
      <CardFooter className="">
        <Link href={`/programme-animations#${props.id}`}>
          <Button variant="ghost" className="p-0">
            Plus de détails
            <ButtonIcon variant="default" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
