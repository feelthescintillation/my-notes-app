import { AllFolders } from './../../types/model/folder';
import { AppActionTypes, UserActionTypes, FolderActionTypes, NoteActionTypes } from './../actions/types';
import { BaseAction } from './../actions/baseAction';
import { AppState } from '../../types/state/appState';
import { User } from '../../types/model/user';
import { Notes, Note } from '../../types/model/note';

export const appReducer = (
    state: AppState = { folderList: null, user: null, noteList: null },
    action: BaseAction,
): AppState => {
    switch (action.type) {
        case AppActionTypes.APP_ALL_FOLDERS_RECIEVED: {
            return {
                ...state,
                folderList: { ...(action.payload as AllFolders) },
            };
        }

        case AppActionTypes.APP_SELECT_FOLDER: {
            if (!state.folderList) {
                return state;
            }
            return { ...state, selectedFolderId: action.payload as string };
        }

        case AppActionTypes.APP_SELECT_NOTE: {
            if (state.selectedFolderId === null) {
                return state;
            }
            const { id } = action.payload;
            return { ...state, selectedNoteId: id };
        }

        case UserActionTypes.USER_RECIEVED: {
            return { ...state, user: action.payload as User };
        }
        case UserActionTypes.GET_USER: {
            return { ...state };
        }

        case FolderActionTypes.FOLDER_ALL_NOTES_RECIEVED: {
            return {
                ...state,
                noteList: { ...(action.payload as Notes) },
            };
        }

        case NoteActionTypes.NOTE_RECIEVED: {
            const note = action.payload as Note;
            return {
                ...state,
                noteList: { ...state.noteList, [note.id]: note },
            };
        }

        default: {
            return state;
        }
    }
};
