import { SearchResult } from "@/lib/types";
import ImageOverlay from "./ui/image-overlay";
import FavoriteButton from "./favorite-button";
import { CldImage } from "next-cloudinary";

type Props = {
  resources: SearchResult[];
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
    <div className={`grid grid-cols-${MAX_COLUMNS} gap-4`}>
      {columns.map((column, index) => (
        <div key={index} className="flex flex-col gap-4">
          {column.map((resource) => {
            const isFavorite = resource.tags.includes("favorite");

            return (
              <div key={resource.public_id}>
                <ImageOverlay displayName={resource.display_name}>
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
                    className="rounded-md"
                  />
                </ImageOverlay>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
