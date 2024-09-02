import UploadButton from "./upload-button";
import cloudinary from "cloudinary";
import CloudinaryImage from "./cloudinary-image";

type SearchResults = {
  public_id: string;
};

export default async function GalleryPage() {
  const result = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(10)
    .execute()) as { resources: SearchResults[] };

  return (
    <section className="space-y-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {result.resources.map((resource) => (
          <CloudinaryImage
            key={resource.public_id}
            src={resource.public_id}
            width="400"
            height="300"
            sizes="100vw"
            alt="Description of my image"
            className="rounded-md"
          />
        ))}
      </div>
    </section>
  );
}
