import { User } from './user';
export interface Note {
    id: string;
    content?: string;
    name?: string;
    // updatedBy: User;
    // updatedTS: string;
    folderId: string;
}

export interface AllNotes {
    //{folderId:{noteId:note}}
    [key: string]: Notes;
}
export interface Notes {
    [key: string]: Note;
}
