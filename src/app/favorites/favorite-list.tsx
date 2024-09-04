"use client";

import { SearchResult } from "@/lib/types";
import { useOptimisticAction } from "next-safe-action/hooks";
import { toggleFavoriteTagAction } from "../../actions/toggle-favorite-tag-action";
import MasonryGrid from "@/components/masonry-grid";

type Props = {
  resources: SearchResult[];
};

export default function FavoriteList({ resources }: Props) {
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

            return { ...resource, tags: updatedTags };
          }

          return resource;
        });

        const filteredResources = updatedResources.filter(
          (resource) => resource.tags.includes("favorite") || !isFavorite,
        );

        return { resources: filteredResources };
      },
    },
  );

  function handleUnfavorite(publicId: string) {
    const isFavorite = true;
    execute({ publicId, isFavorite, pathToRevalidate: "/favorites" });
  }

  return (
    <MasonryGrid
      resources={optimisticState.resources}
      onUnfavorite={handleUnfavorite}
    />
  );
}
