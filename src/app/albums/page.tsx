import cloudinary from "cloudinary";
import { Asset, FolderAssets } from "@/lib/types";
import Album from "./album";

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
      <div className="h-[calc(100vh-168.8px)] overflow-y-auto">
        <div className="grid gap-4 pb-8 pr-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {foldersResult.folders.map((folder, index) => (
            <Album
              key={folder.name}
              foldersName={folder.name}
              folderAssets={folderAssetsResult[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
