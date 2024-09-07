import { Images } from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Appbar() {
  return (
    <div className="border-b">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center px-4">
        <Images className="mr-2" />
        <span className="text-2xl">GALLERY AI</span>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
