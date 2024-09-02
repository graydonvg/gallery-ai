import { FolderClosed, Heart, Image } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SideMenu() {
  return (
    <div className="basis-[20vw] pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Manage
          </h2>
          <div className="space-y-1">
            <Link href="/gallery">
              <Button
                variant="secondary"
                className="w-full justify-start gap-2"
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image aria-hidden size={14} />
                Gallery
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FolderClosed size={14} />
              Albums
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Heart size={14} />
              Favorites
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
