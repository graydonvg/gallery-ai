import { ReactNode } from "react";

type Props = {
  displayName: string;
  children: ReactNode;
};

export default function ImageOverlay({ displayName, children }: Props) {
  return (
    <article className="group relative h-fit">
      {children}
      <div className="absolute bottom-3 left-3 z-40 max-w-[calc(100%-1.5rem)] overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
          {displayName}
        </span>
      </div>
      <div className="absolute inset-0 rounded-md bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
    </article>
  );
}
