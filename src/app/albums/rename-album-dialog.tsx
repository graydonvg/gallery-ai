import { renameAblumAction } from "@/actions/rename-album-action";
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
import { Check, FolderPlus, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  folderName: string;
  onDialogClose: () => void;
};

export function RenameAlbumDialog({ folderName, onDialogClose }: Props) {
  const router = useRouter();
  const [newFolderName, setNewFolderName] = useState(folderName);
  const [open, setOpen] = useState(false);

  async function moveToAlbum() {
    const result = await renameAblumAction({
      oldFolderName: folderName,
      newFolderName,
    });

    if (result?.data?.success) {
      router.refresh();
      setOpen(false);
      onDialogClose();
      setNewFolderName("");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);

        if (!newOpenState) {
          onDialogClose();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-fit w-full justify-start rounded-sm px-2 py-1.5"
          role="menuitem"
        >
          <Pencil className="mr-2 size-4" />
          Rename
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <FolderPlus size={18} />
            Rename &quot;{folderName}&quot;
          </DialogTitle>
          <DialogDescription hidden>Enter the album name.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Enter the new album name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
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
