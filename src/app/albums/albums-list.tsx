"use client";

import { useSearchParams } from "next/navigation";
import Album from "./album";
import { Folder, FolderResources } from "@/lib/types";

type Props = {
  folders: Folder[];
  folderResources: FolderResources[];
};

export default function AlbumsList({ folders, folderResources }: Props) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const filteredFolders = folders
    .filter((folder) => !search || folder.name === search)
    .map((folder) => {
      const folderResourcesData = folderResources.find((res) =>
        res.resources.some((resource) => resource.asset_folder === folder.name),
      );

      return { ...folder, folderResourcesData };
    });

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredFolders.map((folder) => (
        <Album
          key={folder.name}
          folderName={folder.name}
          folderResources={folder.folderResourcesData}
        />
      ))}
    </div>
  );
}
