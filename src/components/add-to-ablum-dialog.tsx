import { addToAblumAction } from "@/actions/add-to-album-action";
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
import { FolderInput, FolderPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  resource: Asset;
  closeResourceMenu: () => void;
};

export function AddToAblumDialog({ resource, closeResourceMenu }: Props) {
  const pathname = usePathname();
  const [albumName, setAlbumName] = useState("");
  const [open, setOpen] = useState(false);
  const actionText = pathname.includes("album")
    ? "Move to Album"
    : "Add to Album";
  const description = `Type an album you want ${pathname.includes("album") ? "move" : "add"} this ${resource.resource_type} to.`;

  async function addToAlbum() {
    const result = await addToAblumAction({
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
        >
          {pathname.includes("album") ? (
            <FolderInput className="mr-2 size-4" />
          ) : (
            <FolderPlus className="mr-2 size-4" />
          )}
          <span>{actionText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{actionText}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
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
          <Button onClick={addToAlbum}>{actionText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
