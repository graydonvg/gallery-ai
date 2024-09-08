"use client";

import { addAblumAction } from "@/actions/add-album-action";
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
import { Check, FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddAlbumDialog() {
  const router = useRouter();
  const [folderName, setfolderName] = useState("");
  const [open, setOpen] = useState(false);

  async function moveToAlbum() {
    const result = await addAblumAction({
      folderName,
    });

    if (result?.data?.success) {
      router.refresh();
      setOpen(false);
      setfolderName("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(newOpenState) => setOpen(newOpenState)}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <FolderPlus className="size-4" />
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <FolderPlus size={18} />
            Add Album
          </DialogTitle>
          <DialogDescription hidden>Enter the album name.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Enter the album name"
            value={folderName}
            onChange={(e) => setfolderName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={moveToAlbum} className="flex items-center gap-2">
            <Check size={16} />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
