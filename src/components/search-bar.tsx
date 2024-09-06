"use client";

import { MouseEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleX, Search } from "lucide-react";

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
      <div className="relative">
        <Input
          placeholder={`Search by ${searchBy}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute right-0 top-0 overflow-hidden">
          {search.length ? (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rotate-in"
              onClick={(e) => clearSearch(e)}
            >
              <CircleX />
            </Button>
          ) : null}
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            disabled={!search.length}
          >
            <Search />
          </Button>
        </div>
      </div>
    </form>
  );
}
