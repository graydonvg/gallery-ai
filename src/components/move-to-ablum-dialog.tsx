import { moveToAblumAction } from "@/actions/move-to-album-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asset } from "@/lib/types";
import { FolderInput } from "lucide-react";
import { useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

type Props = {
  resource: Asset;
  closeResourceMenu: () => void;
};

export function MoveToAblumDialog({ resource, closeResourceMenu }: Props) {
  const [albumName, setAlbumName] = useState("");
  const [open, setOpen] = useState(false);

  async function moveToAlbum() {
    const result = await moveToAblumAction({
      publicId: resource.public_id,
      albumName,
    });

    if (result?.data?.success) {
      setOpen(false);
      closeResourceMenu();
      setAlbumName("");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);

        if (!newOpenState) {
          closeResourceMenu();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-fit w-full justify-start rounded-sm px-2 py-1.5"
          role="menuitem"
        >
          <FolderInput className="mr-2 size-4" />
          Move to Album
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Move to Album</DialogTitle>
          <DialogDescription>
            Type an album you want move this {resource.resource_type} to.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="album-name" className="text-right">
              Album
            </Label>
            <Input
              id="album-name"
              className="col-span-3"
              placeholder="Album name..."
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={moveToAlbum} className="flex items-center gap-2">
            <FolderInput size={16} />
            Move
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
