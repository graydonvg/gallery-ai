import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ResourceMenu from "./resource-menu";
import FavoriteButton from "./favorite-button";
import { Resource } from "@/lib/types";

type Props = {
  resource: Resource;
  isFavorite: boolean;
  children: ReactNode;
};

export default function ResourceOverlay({
  resource,
  isFavorite,
  children,
}: Props) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(
          textRef.current.scrollWidth > textRef.current.clientWidth,
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  function renderDisplayName() {
    return (
      <span
        ref={textRef}
        className="block overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {resource.display_name}
      </span>
    );
  }

  return (
    <article className="group relative mb-4 h-fit select-none break-inside-avoid">
      <ResourceMenu resource={resource} />
      <FavoriteButton isFavorite={isFavorite} publicId={resource.public_id} />
      {children}
      <TooltipProvider>
        <div className="absolute bottom-3 left-3 z-40 max-w-[calc(100%-1.5rem)] overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {isOverflowing ? (
            <Tooltip>
              <TooltipTrigger asChild>{renderDisplayName()}</TooltipTrigger>
              <TooltipContent>
                <span>{resource.display_name}</span>
              </TooltipContent>
            </Tooltip>
          ) : (
            renderDisplayName()
          )}
        </div>
      </TooltipProvider>
      <div className="pointer-events-none absolute inset-0 rounded-md bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
    </article>
  );
}
