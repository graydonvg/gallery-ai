"use client";

import ImageOverlay from "@/components/ui/image-overlay";
import { SearchResult } from "@/lib/types";
import { CldImage } from "next-cloudinary";
import { useOptimisticAction } from "next-safe-action/hooks";
import SolidHeart from "@/components/icons/solid-heart";
import { Heart } from "lucide-react";
import { toggleFavoriteTagAction } from "../../actions/toggle-favorite-tag-action";
import FavoriteButton from "@/components/favorite-button";

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

  return (
    <ul className="grid grid-cols-4 gap-4">
      {optimisticState.resources.map((resource) => {
        const isFavorite = resource.tags.includes("favorite");

        return (
          <li key={resource.public_id}>
            <ImageOverlay displayName={resource.display_name}>
              <FavoriteButton
                isFavorite={isFavorite}
                onUnfavorite={() =>
                  execute({
                    publicId: resource.public_id,
                    isFavorite,
                    pathToRevalidate: "/favorites",
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
