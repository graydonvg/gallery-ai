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
import { SearchResult } from "@/lib/types";
import { FolderPlus } from "lucide-react";
import { useState } from "react";

type Props = {
  resource: SearchResult;
};

export function AddToAblumDialog({ resource }: Props) {
  const [albumName, setAlbumName] = useState("");
  const [open, setOpen] = useState(false);

  async function addToAlbum() {
    const result = await addToAblumAction({
      publicId: resource.public_id,
      albumName,
    });

    if (result?.data?.success) {
      setOpen(false);
      setAlbumName("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-fit w-full justify-start rounded-sm px-2 py-1.5"
        >
          <FolderPlus className="mr-2 size-4" />
          <span>Add to Album</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Album</DialogTitle>
          <DialogDescription>
            Type an album you want move this {resource.resource_type} into.
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
          <Button onClick={addToAlbum}>Add to Album</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
