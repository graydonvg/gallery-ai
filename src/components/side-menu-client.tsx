"use client";

import { FolderClosed, Heart, Image } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Folder } from "@/lib/types";

type Props = {
  folders: Folder[];
};

export default function SideMenuClient({ folders }: Props) {
  const pathname = usePathname();

  return (
    <div className="shrink-0 basis-[220px] border-r border-border pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
            Manage
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className={cn("flex w-full justify-start gap-2 text-lg", {
                "bg-accent text-accent-foreground": pathname === "/gallery",
              })}
            >
              <Link href="/gallery">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image aria-hidden size={20} />
                Gallery
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn("flex w-full justify-start gap-2 text-lg", {
                "bg-accent text-accent-foreground": pathname === "/favorites",
              })}
            >
              <Link href="/favorites">
                <Heart size={20} />
                Favorites
              </Link>
            </Button>
            <div>
              <Button
                asChild
                variant="ghost"
                className={cn("flex w-full justify-start gap-2 text-lg", {
                  "bg-accent text-accent-foreground": pathname === "/albums",
                })}
              >
                <Link href="/albums">
                  <FolderClosed size={20} />
                  Albums
                </Link>
              </Button>
              <div className="pl-8">
                {folders.map((folder) => (
                  <Button
                    key={folder.name}
                    asChild
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex w-full justify-start text-left text-base",
                      {
                        "bg-accent text-accent-foreground":
                          pathname.split("/")[2] === folder.name,
                      },
                    )}
                  >
                    <Link href={`/albums/${folder.name}`}>{folder.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
