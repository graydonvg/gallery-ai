import { Asset } from "@/lib/types";
import cloudinary from "cloudinary";
import AblumList from "./album-list";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: {
    album_name: string;
  };
};

export default async function AlbumPage({ params }: Props) {
  const result = (await cloudinary.v2.search
    .expression(`resource_type:image AND asset_folder=${params.album_name}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: Asset[] };

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4">
        <Button size="sm" variant="link" asChild className="p-0">
          <Link href="/albums" className="flex w-fit items-center gap-2">
            <ArrowLeft />
            Albums
          </Link>
        </Button>
        <h1 className="text-4xl font-bold">{params.album_name}</h1>
      </header>
      <AblumList resources={result.resources} />
    </section>
  );
}
