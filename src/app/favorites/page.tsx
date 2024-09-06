import cloudinary from "cloudinary";
import { Asset } from "@/lib/types";
import FavoriteList from "./favorite-list";
import SearchBar from "@/components/search-bar";

type Props = {
  searchParams: {
    search: string;
  };
};

export default async function FavoritesPage({ searchParams }: Props) {
  const result = (await cloudinary.v2.search
    .expression(
      `resource_type:image${searchParams.search ? ` AND tags=${searchParams.search}` : ""} AND tags=favorite`,
    )
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: Asset[] };

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold">Favorites</h1>
      </header>
      <div className="pr-4">
        <SearchBar path="/favorites" searchBy="tag" />
      </div>
      <FavoriteList resources={result.resources} />
    </section>
  );
}
