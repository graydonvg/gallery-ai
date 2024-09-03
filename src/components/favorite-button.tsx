import { Heart } from "lucide-react";
import SolidHeart from "@/components/icons/solid-heart";

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
    <button className="absolute right-2 top-2 z-50 hidden items-center justify-center rounded-full bg-black/50 p-1 group-hover:flex">
      {isFavorite ? (
        <SolidHeart
          className="right-2 top-2 z-50 text-red-500 hover:text-white"
          onClick={onUnfavorite}
        />
      ) : (
        <Heart
          className="size-6 text-white hover:text-red-500"
          onClick={onFavorite}
        />
      )}
    </button>
  );
}
