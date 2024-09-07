import { Asset } from "@/lib/types";
import ResourceOverlay from "./resource-overlay";
import FavoriteButton from "./favorite-button";
import { CldImage } from "next-cloudinary";
import ResourceMenu from "./resource-menu";

type Props = {
  resources: Asset[];
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
            displayName={resource.display_name}
          >
            <ResourceMenu resource={resource} />
            <FavoriteButton
              isFavorite={isFavorite}
              onFavorite={() => onFavorite?.(resource.public_id)}
              onUnfavorite={() => onUnfavorite(resource.public_id)}
            />
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
