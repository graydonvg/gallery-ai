import { z } from "zod";

export type Resource = {
  public_id: string;
  display_name: string;
  resource_type: string;
  asset_folder: string;
  tags: string[];
};

export type FolderResources = {
  total_count: number;
  resources: Resource[];
};

export type Folder = {
  name: string;
  path: string;
  external_id: string;
};

export const updateTagSchema = z.object({
  publicId: z.string(),
  tag: z.string().trim().min(1, "Tag cannot be empty"),
});
export type UpdateTag = z.infer<typeof updateTagSchema>;

export type ApiResponse = {
  success?: string;
  error?: string;
};
