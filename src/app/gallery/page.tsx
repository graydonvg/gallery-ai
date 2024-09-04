import UploadButton from "./upload-button";
import cloudinary from "cloudinary";
import { SearchResult } from "@/lib/types";
import GalleryList from "./gallery-list";

export default async function GalleryPage() {
  const result = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="space-y-8">
      <header className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </header>
      <GalleryList resources={result.resources} />
    </section>
  );
}
