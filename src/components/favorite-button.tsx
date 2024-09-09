import { Heart } from "lucide-react";
import SolidHeart from "@/components/icons/solid-heart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import addTag from "@/services/tags/add";
import { useRouter } from "next/navigation";
import removeTag from "@/services/tags/remove";
import { useAppDispatch } from "@/lib/redux/hooks";
import { favoriteRemoved } from "@/lib/redux/features/resourceSlice";
import { toast } from "react-toastify";

type Props = {
  publicId: string;
  isFavorite: boolean;
};

export default function FavoriteButton({ publicId, isFavorite }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [optimisticState, setOptimisticState] = useState({ isFavorite });

  async function addFavorite() {
    const result = await addTag({
      publicId,
      tag: "favorite",
    });

    if (result.error) {
      setOptimisticState({ isFavorite: false });
      toast.error(result.error);
    }

    router.refresh();
  }

  async function removeFavorite() {
    dispatch(favoriteRemoved({ publicId }));

    const result = await removeTag({
      publicId,
      tag: "favorite",
    });

    if (result.error) {
      setOptimisticState({ isFavorite: false });
      toast.error(result.error);
    }

    router.refresh();
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="absolute left-2 top-2 z-50 hidden items-center justify-center p-1 text-base group-hover:flex"
            aria-label={
              optimisticState.isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {optimisticState.isFavorite ? (
              <SolidHeart
                className="size-6 text-red-500 hover:text-white"
                onClick={() => {
                  setOptimisticState({ isFavorite: false });
                  removeFavorite();
                }}
              />
            ) : (
              <Heart
                className="size-6 text-white hover:text-red-500"
                onClick={() => {
                  setOptimisticState({ isFavorite: true });
                  addFavorite();
                }}
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {optimisticState.isFavorite ? "Remove favorite" : "Add favorite"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
