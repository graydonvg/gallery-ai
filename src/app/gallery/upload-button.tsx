"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function UploadButton() {
  const router = useRouter();

  return (
    <Button asChild className="text-base">
      <CldUploadButton
        uploadPreset="q5y3bfd6"
        onSuccess={() => setTimeout(() => router.refresh(), 2000)}
      >
        <div className="flex items-center gap-2">
          <Upload size={16} />
          Upload
        </div>
      </CldUploadButton>
    </Button>
  );
}
