import cloudinary from "cloudinary";
import { Asset, Folder, FolderAssets } from "@/lib/types";
import Album from "./album";
import SearchBar from "@/components/search-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateAlbumButton from "./create-album-button";

type Props = {
  searchParams: {
    search: string;
  };
};

export default async function AlbumsPage({ searchParams }: Props) {
  // Fetch all root folders
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  // Determine the target folders based on search params
  const targetFolderNames = searchParams.search
    ? [searchParams.search]
    : folders.map((folder) => folder.name);

  const targetFolders = folders.filter((folder) =>
    targetFolderNames.includes(folder.name),
  );

  // Fetch assets for the target folders
  const folderAssets = (await Promise.all(
    targetFolders.map(async (folder) => {
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
      <header className="flex justify-between">
        <h1 className="text-4xl font-bold">Albums</h1>
        {/* <CreateAlbumButton /> */}
      </header>
      <SearchBar path="/albums" searchBy="album name" />
      <ScrollArea className="mx-auto h-[calc(100vh-256.8px)] rounded-md border p-4">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {targetFolders.map((folder, index) => (
            <Album
              key={folder.name}
              foldersName={folder.name}
              folderAssets={folderAssets[index]}
            />
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
