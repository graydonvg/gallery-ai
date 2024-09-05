import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Appbar() {
  return (
    <div className="border-b">
      <div className="mx-auto flex h-16 items-center px-4">
        GALLERY AI
        <div className="ml-auto flex items-center space-x-4">
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
