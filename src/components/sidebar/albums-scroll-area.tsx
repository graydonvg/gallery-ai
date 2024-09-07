import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import Link from "next/link";
import { FolderClosed, FolderOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { Folder } from "@/lib/types";

type Props = {
  folders: Folder[];
  isAlbumsExpanded: boolean;
};

export default function AlbumsScrollArea({ folders, isAlbumsExpanded }: Props) {
  const pathname = usePathname();

  return (
    <ScrollArea
      className={cn(
        "overflow-hidden px-1 transition-all duration-300 ease-in-out",
        {
          "h-0": !isAlbumsExpanded,
          "h-[300px]": isAlbumsExpanded,
        },
      )}
    >
      <div className="space-y-1 p-2 pt-0">
        {folders.map((folder) => (
          <Button
            key={folder.name}
            asChild
            variant="ghost"
            size="sm"
            className={cn("flex w-full justify-start gap-2 text-left text-sm", {
              "bg-accent text-accent-foreground":
                pathname.split("/")[2] === folder.name,
            })}
          >
            <Link href={`/albums/${folder.name}`}>
              {pathname.split("/")[2] === folder.name ? (
                <FolderOpen size={16} />
              ) : (
                <FolderClosed size={16} />
              )}
              {folder.name}
            </Link>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
