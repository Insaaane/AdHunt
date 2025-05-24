import { TImage } from "@/entities/Listings";

export interface GalleryImageItem {
  original: string;
  thumbnail: string;
}

export function imagesToGallery(
  images: TImage[] | undefined
): GalleryImageItem[] {
  if (!images) return [];
  return images.map((img) => ({
    original: img.image,
    thumbnail: img.image,
  }));
}
