import UploadButton from "./upload-button";
import cloudinary from "cloudinary";
import { Asset } from "@/lib/types";
import GalleryList from "./gallery-list";

export default async function GalleryPage() {
  const result = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: Asset[] };

  return (
    <section className="space-y-8">
      <header className="flex justify-between pr-4">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </header>
      <GalleryList resources={result.resources} />
    </section>
  );
}
