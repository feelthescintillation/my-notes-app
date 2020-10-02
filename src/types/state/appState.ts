import { Notes } from "./../model/note";
import { AllFolders } from "./../model/folder";
import { User } from "../model/user";

export interface AppState {
  user: User | null;
  folderList: AllFolders | null;
  noteList: Notes | null;
  selectedFolderId?: string;
  selectedNoteId?: string;
}
