import cloudinary from "cloudinary";
import { SearchResult } from "@/lib/types";
import FavoriteList from "./favorite-list";

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
      <FavoriteList resources={result.resources} />
    </section>
  );
}
