import { FolderClosed, Heart, Image } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SideMenu() {
  return (
    <div className="basis-[20vw] border-r border-border pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Manage
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className="flex w-full justify-start gap-2"
            >
              <Link href="/gallery">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image aria-hidden size={14} />
                Gallery
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="flex w-full justify-start gap-2"
            >
              <Link href="/albums">
                <FolderClosed size={14} />
                Albums
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="flex w-full justify-start gap-2"
            >
              <Link href="/favorites">
                <Heart size={14} />
                Favorites
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
