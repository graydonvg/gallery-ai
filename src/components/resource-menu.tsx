import { EllipsisVertical, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoveToAblumDialog } from "./move-to-ablum-dialog";
import { Resource } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  resource: Resource;
};

export default function ResourceMenu({ resource }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        aria-label={`${resource.resource_type} menu`}
      >
        <Button
          className={cn(
            "absolute right-2 top-2 z-50 size-8 rounded-full bg-accent/70 p-0 text-accent-foreground hover:bg-accent/80",
            {
              "hidden group-hover:inline-flex": !isOpen,
            },
          )}
        >
          <EllipsisVertical className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 min-w-40">
        <MoveToAblumDialog
          resource={resource}
          closeResourceMenu={() => setIsOpen(false)}
        />
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="h-fit w-full cursor-pointer justify-start rounded-sm px-2 py-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
            asChild
          >
            <Link href={`/edit?publicId=${resource.public_id}`}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
