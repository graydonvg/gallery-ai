import { Resource } from "@/lib/types";
import ResourceOverlay from "./resource-overlay";
import { CldImage } from "next-cloudinary";

type Props = {
  resources: Resource[];
  onFavorite?: (publicId: string) => void;
  onUnfavorite: (publicId: string) => void;
};

export default function MasonryGrid({
  resources,
  onFavorite,
  onUnfavorite,
}: Props) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-5">
      {resources.map((resource) => {
        const isFavorite = resource.tags.includes("favorite");

        return (
          <ResourceOverlay
            key={resource.public_id}
            resource={resource}
            onFavorite={onFavorite}
            onUnfavorite={onUnfavorite}
            isFavorite={isFavorite}
          >
            <CldImage
              src={resource.public_id}
              alt={resource.display_name}
              width="400"
              height="300"
              sizes="100vw"
              className="select-none rounded-md"
            />
          </ResourceOverlay>
        );
      })}
    </div>
  );
}
