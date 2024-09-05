"use client";

import { FolderAssets } from "@/lib/types";
import { CldImage } from "next-cloudinary";

type Props = {
  folderAssets: FolderAssets;
};

export default function ImagePreview({ folderAssets }: Props) {
  return (
    <div className="flex items-center gap-2">
      {folderAssets.resources.map((resource, index) => (
        <div
          key={resource.public_id}
          className="relative size-16 overflow-hidden"
        >
          <CldImage
            src={resource.public_id}
            alt={resource.display_name}
            sizes="64px"
            className="absolute select-none rounded-md object-cover"
            fill
          />
        </div>
      ))}
      {folderAssets.total_count > 6 ? (
        <span className="text-xl text-foreground">
          (+{folderAssets.total_count - 5})
        </span>
      ) : null}
    </div>
  );
}
