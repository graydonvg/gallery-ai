import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { RenameAlbumDialog } from "./rename-album-dialog";

type Props = {
  folderName: string;
};

export default function AlbumMenu({ folderName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild aria-label="Album menu">
        <Button
          variant="ghost"
          className="group-hover:bg-accentgroup-hover:text-accent-foreground absolute right-2 top-2 z-50 size-8 rounded-full p-0 hover:bg-background/20"
        >
          <EllipsisVertical className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 min-w-40">
        <RenameAlbumDialog
          folderName={folderName}
          onDialogClose={() => setIsOpen(false)}
        />
        <DropdownMenuItem asChild>
          {/* <Button
            variant="ghost"
            className="h-fit w-full cursor-pointer justify-start rounded-sm px-2 py-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
            asChild
          >
            <Link href={`/edit?publicId=${resource.public_id}`}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
