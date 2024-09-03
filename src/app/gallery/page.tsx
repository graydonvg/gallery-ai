import UploadButton from "./upload-button";
import cloudinary from "cloudinary";
import CloudinaryImage from "./cloudinary-image";
import { SearchResult } from "@/lib/types";

export default async function GalleryPage() {
  const result = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="space-y-8">
      <header className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </header>
      <ul className="grid grid-cols-4 gap-4">
        {result.resources.map((resource) => (
          <li key={resource.public_id}>
            <CloudinaryImage imageData={resource} />
          </li>
        ))}
      </ul>
    </section>
  );
}
