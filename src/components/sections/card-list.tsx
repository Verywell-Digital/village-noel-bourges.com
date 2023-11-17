"use client";

import { useState } from "react";

export interface CardListSwiperProps<T> {
  className?: string;
  cardClassName?: string;
  CardComponent: any;
  data: T[];
}

export default function CardList<T>({
  className = "",
  cardClassName = "",
  CardComponent,
  data,
}: CardListSwiperProps<T>) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <>
      {data?.map((slideContent, index) => (
        <div key={index} className={className}>
          <CardComponent
            className={cardClassName}
            isSelected={selectedCard === index}
            setIsSelected={() => setSelectedCard(index)}
            key={index}
            {...slideContent}
          />
        </div>
      ))}
    </>
  );
}
