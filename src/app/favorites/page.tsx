import cloudinary from "cloudinary";
import CloudinaryImage from "../gallery/cloudinary-image";
import { SearchResult } from "@/lib/types";

export default async function FavoritesPage() {
  const result = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="space-y-8">
      <header className="flex justify-between">
        <h1 className="text-4xl font-bold">Favorites</h1>
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
