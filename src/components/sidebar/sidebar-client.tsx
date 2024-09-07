"use client";

import { ChevronRight, Heart, Image, Library } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Folder } from "@/lib/types";
import { useState } from "react";
import AlbumsScrollArea from "./albums-scroll-area";
import SidebarButton from "./sidebar-button";

type Props = {
  folders: Folder[];
};

export default function SidebarClient({ folders }: Props) {
  const [isAlbumsExpanded, setIsAlbumsExpanded] = useState(true);

  return (
    <div className="shrink-0 basis-[220px] space-y-2 border-r border-border px-3 py-6">
      <h2 className="px-4 text-xl font-semibold tracking-tight">
        Media Library
      </h2>
      <div className="space-y-1">
        <SidebarButton
          href="/gallery"
          label="Gallery"
          /* eslint-disable-next-line jsx-a11y/alt-text */
          icon={<Image aria-hidden size={20} />}
        />
        <SidebarButton
          href="/favorites"
          label="Favorites"
          icon={<Heart size={20} />}
        />
        <SidebarButton href="/albums" className="pr-0">
          <div className="w-full">
            <Link
              href="/albums"
              className="flex w-full items-center justify-start gap-2"
            >
              <Library size={20} />
              Albums
            </Link>
            <Button
              className="h-10 bg-transparent px-4 py-2 text-accent-foreground hover:bg-transparent"
              onClick={() => setIsAlbumsExpanded((prev) => !prev)}
            >
              <ChevronRight
                size={20}
                className={cn("transition-transform duration-300", {
                  "rotate-90": isAlbumsExpanded,
                })}
              />
            </Button>
          </div>
        </SidebarButton>
        <AlbumsScrollArea
          folders={folders}
          isAlbumsExpanded={isAlbumsExpanded}
        />
      </div>
    </div>
  );
}
