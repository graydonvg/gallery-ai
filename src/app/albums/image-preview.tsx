"use client";

import { FolderResources } from "@/lib/types";
import { CldImage } from "next-cloudinary";

type Props = {
  folderResources?: FolderResources;
};

export default function ImagePreview({ folderResources }: Props) {
  if (!folderResources || folderResources.total_count === 0) {
    return <span>Empty album</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {folderResources.resources.map((resource, index) => (
        <div key={resource.public_id} className="flex gap-2">
          <div className="relative flex size-16 shrink-0 gap-2 overflow-hidden">
            <CldImage
              src={resource.public_id}
              alt={resource.display_name}
              sizes="64px"
              className="absolute select-none rounded-md object-cover"
              fill
            />
          </div>
          {folderResources.total_count > 6 && index === 4 ? (
            <span className="flex size-16 items-center justify-center text-xl text-foreground">
              (+{folderResources.total_count - 5})
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
