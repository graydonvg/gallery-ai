export type Asset = {
  public_id: string;
  display_name: string;
  resource_type: string;
  asset_folder: string;
  tags: string[];
};

export type FolderAssets = {
  total_count: number;
  resources: Asset[];
};

export type Folder = {
  name: string;
  path: string;
  external_id: string;
};
