import { AllNotes, Notes, Note } from './../types/model/note';
import { AllFolders } from './../types/model/folder';
import { sessionStorageWorker } from './common.services';
import { Folder } from '../types/model/folder';
import { User } from '../types/model/user';

const ALL_FOLDER_KEY = 'ALL_FOLDERS';
const ALL_NOTES_KEY = 'ALL_NOTES';

const cache: {
    allFolders?: AllFolders | null;
    allNotes?: AllNotes | null;
} = {};

export function getAllFolders(): AllFolders {
    let res;
    if (cache.allFolders) {
        res = cache.allFolders;
    } else {
        res = sessionStorageWorker.get(ALL_FOLDER_KEY) as AllFolders;
        cache.allFolders = res;
    }
    return res;
}

export function getFolder(folderId: string): Folder {
    const data = getAllFolders();
    return data[folderId];
}

function getAllNotes(): AllNotes {
    let res;
    if (cache.allNotes) {
        res = cache.allNotes;
    } else {
        res = sessionStorageWorker.get(ALL_NOTES_KEY) as AllNotes;
        cache.allNotes = res;
    }
    return res;
}

export function getNotesInFolder(folderId: string): Notes {
    const allNotes = getAllNotes() || { [folderId]: {} };
    return allNotes[folderId] || {};
}

export function getNote(folderId: string, noteId: string): Note {
    return getNotesInFolder(folderId)[noteId];
}

export function addNote(note: Note) {
    const allNotes = getAllNotes() || { [note.folderId]: { [note.id]: {} } };
    allNotes[note.folderId] = allNotes[note.folderId] || {};
    allNotes[note.folderId][note.id] = note;
    const didSave = sessionStorageWorker.set(ALL_NOTES_KEY, allNotes);
    if (didSave) {
        //invalidate cache
        cache.allNotes = null;
    }
    return getNotesInFolder(note.folderId);
}

export function updateFolder(folderId: string, folder: Folder | null, deleteFolder?: boolean): AllFolders {
    const allFolders = getAllFolders() || {};
    if (true === deleteFolder) {
        delete allFolders[folderId];
    } else {
        folder && (allFolders[folderId] = folder);
    }
    const didSave = sessionStorageWorker.set(ALL_FOLDER_KEY, allFolders);
    if (didSave) {
        //invalidate cache
        cache.allFolders = null;
    }
    return getAllFolders();
}

export function updateNote(note: Note, deleteNote?: boolean): Note {
    const allNotes: AllNotes = getAllNotes();

    if (true === deleteNote) {
        delete allNotes[note.folderId][note.id];
    } else {
        const notes: Notes = allNotes?.[note.folderId];
        notes[note.id] = note;
    }
    const didSave = sessionStorageWorker.set(ALL_NOTES_KEY, allNotes);
    if (didSave) {
        //invalidate cache
        cache.allNotes = null;
    }
    return getNote(note.folderId, note.id);
}

export function getUser(): Promise<User> {
    return Promise.resolve({ id: 'Sijeesh' });
}
