import { Asset } from "@/lib/types";
import cloudinary from "cloudinary";
import AblumList from "./album-list";
import SearchBar from "@/components/search-bar";

type Props = {
  params: {
    album_name: string;
  };
  searchParams: {
    search: string;
  };
};

export default async function AlbumPage({ params, searchParams }: Props) {
  const result = (await cloudinary.v2.search
    .expression(
      `resource_type:image AND asset_folder=${params.album_name}${searchParams.search ? ` AND tags=${searchParams.search}` : ""}`,
    )
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: Asset[] };

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Album: {params.album_name}</h1>
      </header>
      <SearchBar path={`/albums/${params.album_name}`} searchBy="tag" />
      <AblumList resources={result.resources} />
    </section>
  );
}
