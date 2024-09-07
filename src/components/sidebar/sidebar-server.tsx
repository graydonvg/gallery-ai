import { Folder } from "@/lib/types";
import SidebarClient from "./sidebar-client";
import cloudinary from "cloudinary";

export default async function SidebarServer() {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  return <SidebarClient folders={folders} />;
}
