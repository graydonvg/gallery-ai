import { Heart } from "lucide-react";
import SolidHeart from "@/components/icons/solid-heart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  isFavorite: boolean;
  onFavorite?: () => void;
  onUnfavorite: () => void;
};

export default function FavoriteButton({
  isFavorite,
  onFavorite,
  onUnfavorite,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="absolute left-2 top-2 z-50 hidden items-center justify-center p-1 text-base group-hover:flex"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? (
              <SolidHeart
                className="size-6 text-red-500 hover:text-white"
                onClick={onUnfavorite}
              />
            ) : (
              <Heart
                className="size-6 text-white hover:text-red-500"
                onClick={onFavorite}
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFavorite ? "Remove favorite" : "Add favorite"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
