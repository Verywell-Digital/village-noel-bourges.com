import { type StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

export interface GalleryDataType {
  id?: string | number;
  href?: string;
  featuredImage?: string | StaticImageData;
}

export interface MediaDataType {
  id: string | number;
  href: string;
  image: string | StaticImageData;
  mediaType?: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string | string[];
  galleryImgs?: string[];
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";
