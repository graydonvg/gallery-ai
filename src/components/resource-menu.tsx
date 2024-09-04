import { EllipsisVertical, FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddToAblumDialog } from "./add-to-ablum-dialog";
import { SearchResult } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  resource: SearchResult;
};

export default function ResourceMenu({ resource }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenuTrigger
            asChild
            aria-label={`${resource.resource_type} menu`}
          >
            <TooltipTrigger asChild>
              <Button
                className={cn(
                  "absolute right-2 top-2 z-50 size-8 rounded-full bg-secondary/70 p-0 text-secondary-foreground hover:bg-secondary/80",
                  {
                    "hidden group-hover:inline-flex": !isOpen,
                  },
                )}
              >
                <EllipsisVertical className="size-6" />
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>
            <p>
              <span className="capitalize">{resource.resource_type}</span> menu
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent className="z-50 min-w-40">
        <DropdownMenuItem asChild>
          <AddToAblumDialog resource={resource} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
