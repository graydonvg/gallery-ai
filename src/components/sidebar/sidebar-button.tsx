import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  href?: string;
  icon?: ReactNode;
  label?: string;
  className?: string;
  children?: ReactNode;
};

export default function SidebarButton({
  href,
  icon,
  label,
  className,
  children,
}: Props) {
  const pathname = usePathname();

  return (
    <Button
      asChild
      variant="ghost"
      className={cn("flex w-full items-center justify-start gap-2", className, {
        "bg-accent text-accent-foreground": pathname === href,
      })}
    >
      {!children && href && icon && label ? (
        <Link href={href}>
          {icon}
          {label}
        </Link>
      ) : (
        children
      )}
    </Button>
  );
}
