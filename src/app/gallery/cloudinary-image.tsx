"use client";

import { CldImage } from "next-cloudinary";
import { SearchResult } from "@/lib/types";
import ImageOverlay from "@/components/ui/image-overlay";
import FavoriteButton from "@/app/gallery/favorite-button";

type Props = {
  imageData: SearchResult;
};

export default function CloudinaryImage({ imageData }: Props) {
  return (
    <ImageOverlay>
      <FavoriteButton imageData={imageData} />
      <CldImage
        src={imageData.public_id}
        alt={imageData.display_name}
        width="400"
        height="300"
        sizes="100vw"
        className="rounded-md"
      />
    </ImageOverlay>
  );
}
