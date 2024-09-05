import cloudinary from "cloudinary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Asset, FolderAssets } from "@/lib/types";
import ImagePreview from "./image-preview";

type Folder = {
  folders: {
    name: string;
    path: string;
    external_id: string;
  }[];
};

export default async function AlbumsPage() {
  const foldersResult = (await cloudinary.v2.api.root_folders()) as Folder;
  const folderAssetsResult = (await Promise.all(
    foldersResult.folders.map(async (folder) => {
      const result = await cloudinary.v2.search
        .expression(`resource_type:image AND asset_folder=${folder.name}`)
        .sort_by("created_at", "desc")
        .with_field("tags")
        .max_results(5)
        .execute();
      return result as { resources: Asset[] };
    }),
  )) as FolderAssets[];

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold">Albums</h1>
      </header>
      <div className="grid grid-cols-2 gap-4">
        {foldersResult.folders.map((folder, index) => (
          <Link key={folder.name} href={`albums/${folder.name}`}>
            <Card
              key={folder.name}
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
            >
              <CardHeader>
                <CardTitle>{folder.name}</CardTitle>
                <CardDescription>All your {folder.name} assets</CardDescription>
              </CardHeader>
              <CardContent>
                <ImagePreview folderAssets={folderAssetsResult[index]} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
