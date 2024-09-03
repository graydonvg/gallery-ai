import { Heart } from "lucide-react";
import { useOptimisticAction } from "next-safe-action/hooks";
import { toggleFavoriteTagAction } from "@/app/gallery/actions";
import { SearchResult } from "@/lib/types";
import SolidHeart from "@/components/icons/solid-heart";

type Props = {
  imageData: SearchResult;
};

export default function FavoriteButton({ imageData }: Props) {
  const { execute, optimisticState } = useOptimisticAction(
    toggleFavoriteTagAction,
    {
      currentState: { tags: imageData.tags },
      updateFn: (state, { isFavorite }) => {
        const newTags = isFavorite
          ? state.tags.filter((tag) => tag !== "favorite")
          : [...state.tags, "favorite"];

        return { tags: newTags };
      },
    },
  );

  const isFavorited = optimisticState.tags.includes("favorite");

  return (
    <button className="absolute right-2 top-2 z-50 hidden items-center justify-center rounded-full bg-black/50 p-1 group-hover:flex">
      {isFavorited ? (
        <SolidHeart
          className="right-2 top-2 z-50 text-red-500 hover:text-white"
          onClick={() =>
            execute({ publicId: imageData.public_id, isFavorite: true })
          }
        />
      ) : (
        <Heart
          className="size-6 text-white hover:text-red-500"
          onClick={() =>
            execute({ publicId: imageData.public_id, isFavorite: false })
          }
        />
      )}
    </button>
  );
}
