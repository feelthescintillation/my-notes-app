export interface Folder {
  id: string;
  name: string;
  color?: string;
}
export interface AllFolders {
  [key: string]: Folder;
}
