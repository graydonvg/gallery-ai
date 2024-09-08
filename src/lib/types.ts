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
