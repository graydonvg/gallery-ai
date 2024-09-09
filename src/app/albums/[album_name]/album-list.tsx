import { Resource } from "@/lib/types";
import MasonryGrid from "@/components/masonry-grid";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  resources: Resource[];
};

export default function AblumList({ resources }: Props) {
  return (
    <ScrollArea className="mx-auto h-[calc(100vh-256.8px)] rounded-md border p-4">
      <MasonryGrid resources={resources} />
    </ScrollArea>
  );
}
