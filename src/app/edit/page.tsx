"use client";

import { CldImage } from "next-cloudinary";

type Props = {
  searchParams: {
    publicId: string;
  };
};

export default function EditPage({ searchParams }: Props) {
  return (
    <section className="space-y-8">
      <header className="flex justify-between">
        <h1 className="text-4xl font-bold">Edit {searchParams.publicId}</h1>
      </header>
      <CldImage
        src={searchParams.publicId}
        alt={searchParams.publicId}
        width="300"
        height="200"
        // sizes="100vw"
        className="h-auto w-auto select-none rounded-md"
        priority
      />
    </section>
  );
}
