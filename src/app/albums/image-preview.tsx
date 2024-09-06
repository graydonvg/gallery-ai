"use client";

import { FolderAssets } from "@/lib/types";
import { CldImage } from "next-cloudinary";

type Props = {
  folderAssets: FolderAssets;
};

export default function ImagePreview({ folderAssets }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {folderAssets.total_count > 0 ? (
        folderAssets.resources.map((resource, index) => (
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
            <>
              {folderAssets.total_count > 6 && index === 4 ? (
                <span className="flex size-16 items-center justify-center text-xl text-foreground">
                  (+{folderAssets.total_count - 5})
                </span>
              ) : null}
            </>
          </div>
        ))
      ) : (
        <span>Empty album</span>
      )}
    </div>
  );
}
