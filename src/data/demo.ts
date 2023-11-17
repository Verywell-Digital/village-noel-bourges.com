import __gallery from "./jsons/__gallery.json";
import __sectionsCarrousel from "./jsons/__sectionsCarrousel.json";
import { type MediaDataType, type GalleryDataType } from "./types";

// FOR POST TYPE AUDIO
const DEMO_GALLERY_IMAGE = __gallery.map((d, index): GalleryDataType => {

  return {
    ...d,
    id: `DEMO_GALLERY_IMAGE_${index + 1}`,
  } as GalleryDataType;
});

export {
  DEMO_GALLERY_IMAGE,
};


// FOR MEDIA TYPE GALLERY
const DEMO_SECTIONS_GALLERY = __sectionsCarrousel.map((d, index): any => {
  //  ##########  GET CATEGORY BY CAT ID ######## //

  return {
    ...d,
    id: `DEMO_SECTIONS_GALLERY_${index + 1}`,
  } as any;
});

export {
  DEMO_SECTIONS_GALLERY,
};
