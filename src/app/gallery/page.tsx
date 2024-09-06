import UploadButton from "./upload-button";
import cloudinary from "cloudinary";
import { Asset } from "@/lib/types";
import GalleryList from "./gallery-list";
import SearchBar from "@/components/search-bar";

type Props = {
  searchParams: {
    search: string;
  };
};

export default async function GalleryPage({ searchParams }: Props) {
  const result = (await cloudinary.v2.search
    .expression(
      `resource_type:image${searchParams.search ? ` AND tags=${searchParams.search}` : ""}`,
    )
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
      <div className="pr-4">
        <SearchBar path="/gallery" searchBy="tag" />
      </div>
      <GalleryList resources={result.resources} />
    </section>
  );
}
