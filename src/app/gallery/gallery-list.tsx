"use client";

import { SearchResult } from "@/lib/types";
import { useOptimisticAction } from "next-safe-action/hooks";
import { toggleFavoriteTagAction } from "../../actions/toggle-favorite-tag-action";
import MasonryGrid from "@/components/masonry-grid";

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

  function handleFavorite(publicId: string) {
    const isFavorite = false;
    execute({ publicId, isFavorite, pathToRevalidate: "/gallery" });
  }

  function handleUnfavorite(publicId: string) {
    const isFavorite = true;
    execute({ publicId, isFavorite, pathToRevalidate: "/gallery" });
  }

  return (
    <MasonryGrid
      resources={optimisticState.resources}
      onFavorite={handleFavorite}
      onUnfavorite={handleUnfavorite}
    />
  );
}
