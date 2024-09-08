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

type Props = {
  foldersName: string;
  folderResources?: FolderResources;
};

export default function Album({ foldersName, folderResources }: Props) {
  return (
    <Link href={`albums/${foldersName}`}>
      <Card
        key={foldersName}
        className="h-full cursor-pointer hover:bg-accent hover:text-accent-foreground"
      >
        <CardHeader>
          <CardTitle>{foldersName}</CardTitle>
          <CardDescription>All your {foldersName} assets</CardDescription>
        </CardHeader>
        <CardContent>
          <ImagePreview folderResources={folderResources} />
        </CardContent>
      </Card>
    </Link>
  );
}
