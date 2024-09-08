import cloudinary from "cloudinary";
import { Resource, Folder, FolderResources } from "@/lib/types";
import SearchBar from "@/components/search-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import AlbumsList from "./albums-list";
import { Suspense } from "react";
import { AddAlbumDialog } from "./add-ablum-dialog";

export default async function AlbumsPage() {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  const folderResources = (await Promise.all(
    folders.map(async (folder) => {
      const result = await cloudinary.v2.search
        .expression(`resource_type:image AND asset_folder=${folder.name}`)
        .sort_by("created_at", "desc")
        .with_field("tags")
        .max_results(5)
        .execute();
      return result as { resources: Resource[] };
    }),
  )) as FolderResources[];

  return (
    <section className="space-y-8">
      <header className="flex justify-between">
        <h1 className="text-4xl font-bold">Albums</h1>
        <AddAlbumDialog />
      </header>
      <Suspense fallback={null}>
        <SearchBar path="/albums" searchBy="album name" />
      </Suspense>
      <ScrollArea className="mx-auto h-[calc(100vh-256.8px)] rounded-md border p-4">
        <Suspense fallback={null}>
          <AlbumsList folders={folders} folderResources={folderResources} />
        </Suspense>
      </ScrollArea>
    </section>
  );
}
