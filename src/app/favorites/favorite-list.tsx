"use client";

import { Resource } from "@/lib/types";
import MasonryGrid from "@/components/masonry-grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { resourcesAdded } from "@/lib/redux/features/resourceSlice";

type Props = {
  resources: Resource[];
};

export default function FavoriteList({ resources }: Props) {
  const dispatch = useAppDispatch();
  const resourcesData = useAppSelector((state) => state.resources.data);

  useEffect(() => {
    dispatch(resourcesAdded(resources));
  }, [dispatch, resources]);

  return (
    <ScrollArea className="mx-auto h-[calc(100vh-256.8px)] rounded-md border p-4">
      <MasonryGrid resources={resourcesData} />
    </ScrollArea>
  );
}
