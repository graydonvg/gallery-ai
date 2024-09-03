"use client";

import ImageOverlay from "@/components/ui/image-overlay";
import { SearchResult } from "@/lib/types";
import FavoriteButton from "../../components/favorite-button";
import { CldImage } from "next-cloudinary";
import { useOptimisticAction } from "next-safe-action/hooks";
import { toggleFavoriteTagAction } from "../../actions/toggle-favorite-tag-action";

type Props = {
  resources: SearchResult[];
};

export default function GalleryList({ resources }: Props) {
  const { execute, optimisticState } = useOptimisticAction(
    toggleFavoriteTagAction,
    {
      currentState: { resources },
      updateFn: (state, { publicId, isFavorite }) => {
        const updatedResources = state.resources.map((resource) => {
          if (resource.public_id === publicId) {
            const updatedTags = isFavorite
              ? resource.tags.filter((tag) => tag !== "favorite")
              : [...resource.tags, "favorite"];

            return {
              ...resource,
              tags: updatedTags,
            };
          }

          return resource;
        });

        return { resources: updatedResources };
      },
    },
  );

  return (
    <ul className="grid grid-cols-4 gap-4">
      {optimisticState.resources.map((resource) => {
        const isFavorite = resource.tags.includes("favorite");

        return (
          <li key={resource.public_id}>
            <ImageOverlay>
              <FavoriteButton
                isFavorite={isFavorite}
                onUnfavorite={() =>
                  execute({
                    publicId: resource.public_id,
                    isFavorite,
                    pathToRevalidate: "/gallery",
                  })
                }
                onFavorite={() =>
                  execute({
                    publicId: resource.public_id,
                    isFavorite,
                    pathToRevalidate: "/gallery",
                  })
                }
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
          </li>
        );
      })}
    </ul>
  );
}
