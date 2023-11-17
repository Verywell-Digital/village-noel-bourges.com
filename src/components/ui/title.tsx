import React, { type ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  withLine?: boolean;
  isHTML?: boolean;
}

const Title = ({
  children,
  level = 1,
  className,
  isHTML = false,
  withLine = false,
}: Props) => {
  const TagName = `h${level}`;

  const levelColorClasses = {
    1: "mb-5 md:mb-6 text-4xl xl:text-5xl 2xl:text-6xl font-title uppercase",
    2: "text-3xl xl:text-4xl 2xl:text-[40px] mb-5 md:mb-6 font-title font-medium uppercase",
    3: "font-semibold uppercase text-xl mb-4 font-title text-2xl",
    4: "text-xl font-semibold font-title uppercase font-semibold",
    5: "pb-2 text-lg md:text-xl font-title",
    6: "text-gray-500",
  };

  const classes = clsx(levelColorClasses[level], className);

  return (
    <div className="flex w-full flex-col">
      {/* En utilisant React.createElement, 
      je peux créer dynamiquement le composant TagName en passant 
      la classe classes comme prop className, et le children comme paramètre. 
      De cette façon, TypeScript peut garantir que la prop children est correctement définie pour le composant. */}
      {isHTML
        ? React.createElement(TagName, {
            className: classes,
            dangerouslySetInnerHTML: { __html: children as string },
          })
        : React.createElement(TagName, { className: classes }, children)}
      {withLine && (
        <hr className="bg-brand mb-10 h-[1px] max-w-sm border-none" />
      )}
    </div>
  );
};

export default Title;
