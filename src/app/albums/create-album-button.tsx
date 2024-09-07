"use client";

import { Button } from "@/components/ui/button";
import { FolderPlus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateAlbumButton() {
  const router = useRouter();

  return (
    <Button asChild className="text-base">
      <div className="flex items-center gap-2">
        <FolderPlus />
        Create Album
      </div>
    </Button>
  );
}
