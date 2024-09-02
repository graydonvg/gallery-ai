"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";

type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function GalleryPage() {
  const [imageId, setImageId] = useState("");

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <Button asChild>
          <div className="flex gap-2">
            <Upload size={16} />
            <CldUploadButton
              uploadPreset="q5y3bfd6"
              // @ts-ignore
              onSuccess={(result: UploadResult) =>
                setImageId(result?.info?.public_id)
              }
            />
          </div>
        </Button>
      </div>
    </section>
  );
}
