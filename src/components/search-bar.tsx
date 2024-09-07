"use client";

import { MouseEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleX, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  path: string;
  searchBy: string;
};

export default function SearchBar({ path, searchBy }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSearch = searchParams.get("search");
  const [search, setSearch] = useState(activeSearch ?? "");

  function clearSearch(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setSearch("");

    if (!search) return;

    router.replace(path);
    router.refresh();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!search.length) return;

        router.replace(`${path}?search=${encodeURIComponent(search)}`);
        router.refresh();
      }}
      className="mx-auto max-w-xl"
    >
      <div
        className="relative cursor-text"
        onClick={() => {
          document.getElementById("search-input")?.focus();
        }}
      >
        <Input
          id="search-input"
          placeholder={`Search by ${searchBy}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-20"
        />
        <div className="absolute right-0 top-0 overflow-hidden">
          <TooltipProvider>
            <Tooltip disableHoverableContent>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  onClick={(e) => clearSearch(e)}
                  className={cn(
                    "bg-transparent text-accent-foreground transition-transform duration-300 hover:bg-transparent",
                    {
                      "translate-y-10 rotate-90": !search.length,
                    },
                  )}
                >
                  <CircleX />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset search</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip disableHoverableContent>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  disabled={!search.length}
                  className="bg-transparent text-accent-foreground hover:bg-transparent"
                >
                  <Search />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Search</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </form>
  );
}
