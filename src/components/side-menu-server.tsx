import { Folder } from "@/lib/types";
import SideMenuClient from "./side-menu-client";
import cloudinary from "cloudinary";

export default async function SideMenuServer() {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  return <SideMenuClient folders={folders} />;
}
