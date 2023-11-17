import React, { HTMLAttributes, ReactNode } from "react";
import Title from "../ui/title";
import { cn } from "@/lib/utils";
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  titleLevel?: any;
  title?: string;
  text?: string;
  altText?: string;
  isHtml?: boolean;
  children?: React.ReactNode;
  className?: string;
}
// add default button state
const Heading: React.FC<HeadingProps> = ({ children, className, ...args }) => {
  return (
    <div className={cn(className, "flex w-full flex-wrap justify-between space-y-8")}>
      <Title
        className={`${args.isHtml ? "" : "font-bold md:w-1/2"} uppercase !m-0`}
        level={args.titleLevel}
        isHTML={args.isHtml}
      >
        {args.title}
      </Title>
      {args.altText ? (
        <div className="flex w-full flex-col flex-wrap sm:flex-row">
          <p className="sm:w-1/2 sm:pr-2.5">{args.text}</p>
          <p className="sm:w-1/2 sm:pl-2.5">{args.altText}</p>
        </div>
      ) : args.text ? (
        <div className="flex flex-col flex-wrap sm:flex-row">
          <p className="sm:pr-2.5">{args.text}</p>
        </div>
      ) : (
        null
      )}
      {children}
    </div>
  );
};
export default Heading;
