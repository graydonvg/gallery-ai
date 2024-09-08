import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FolderResources } from "@/lib/types";
import Link from "next/link";
import ImagePreview from "./image-preview";
import AlbumMenu from "./album-menu";

type Props = {
  folderName: string;
  folderResources?: FolderResources;
};

export default function Album({ folderName, folderResources }: Props) {
  return (
    <div className="group relative">
      <AlbumMenu folderName={folderName} />
      <Link href={`albums/${folderName}`}>
        <Card
          key={folderName}
          className="h-full cursor-pointer group-hover:bg-accent group-hover:text-accent-foreground"
        >
          <CardHeader>
            <CardTitle>{folderName}</CardTitle>
            <CardDescription>All your {folderName} assets</CardDescription>
          </CardHeader>
          <CardContent>
            <ImagePreview folderResources={folderResources} />
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
