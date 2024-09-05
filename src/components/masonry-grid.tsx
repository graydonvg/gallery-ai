import { Asset } from "@/lib/types";
import ResourceOverlay from "./ui/resource-overlay";
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
  const MAX_COLUMNS = 4;
  const columns = Array.from(Array(MAX_COLUMNS)).map((_, index) =>
    getColumns(index),
  );

  function getColumns(colIndex: number) {
    return resources.filter((_, index) => index % MAX_COLUMNS === colIndex);
  }

  return (
    <div
      className="grid gap-4 pb-8 pr-4"
      style={{
        gridTemplateColumns: `repeat(${MAX_COLUMNS}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((column, index) => (
        <div key={index} className="flex flex-col gap-4">
          {column.map((resource) => {
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
      ))}
    </div>
  );
}
