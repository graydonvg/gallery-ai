import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ImageOverlay({ children }: Props) {
  return (
    <article className="group relative h-fit">
      {children}
      <div className="absolute inset-0 rounded-md bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
    </article>
  );
}
