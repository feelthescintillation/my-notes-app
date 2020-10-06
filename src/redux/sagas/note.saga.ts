import { Note } from './../../types/model/note';
import { NoteActionTypes, AppActionTypes } from './../actions/types';
import { BaseAction } from '../actions/baseAction';
import { put, takeLatest, call, delay } from 'redux-saga/effects';
import { FolderActionTypes } from '../actions/types';
import * as Services from '../../services/folder.services';

function* addNote(action: BaseAction) {
    const note = action.payload as Note;
    const updatedFolder = yield call(Services.addNote, note);
    yield put({
        type: FolderActionTypes.FOLDER_GET_ALL_NOTES,
        payload: note.folderId,
    });
}

function* getAllNotes(action: BaseAction) {
    const folderId = action.payload as string;
    const allNotes = yield call(Services.getNotesInFolder, folderId);
    yield put({
        type: FolderActionTypes.FOLDER_ALL_NOTES_RECIEVED,
        payload: allNotes,
    });
}

function* getNote(action: BaseAction) {
    const { folderId, id } = action.payload;
    const note = yield call(Services.getNote, folderId, id);

    yield put({
        type: NoteActionTypes.NOTE_RECIEVED,
        payload: note,
    });
}

function* updateNote(action: BaseAction) {
    yield delay(500);
    const { note } = action.payload;
    yield call(Services.updateNote, note);
}

function* deleteNote(action: BaseAction) {
    const note = action.payload as Note;
    const updated = yield call(Services.updateNote, note, true);
    yield put({
        type: FolderActionTypes.FOLDER_GET_ALL_NOTES,
        payload: note.folderId,
    });
}

export function* watchAddNote() {
    yield takeLatest(FolderActionTypes.FOLDER_ADD_NOTE, addNote);
}

export function* watchGetAllNotes() {
    yield takeLatest(FolderActionTypes.FOLDER_GET_ALL_NOTES, getAllNotes);
}

export function* watchGetNote() {
    yield takeLatest([NoteActionTypes.NOTE_GET, AppActionTypes.APP_SELECT_NOTE], getNote);
}

export function* watchUpdateNote() {
    yield takeLatest(NoteActionTypes.NOTE_UPDATE, updateNote);
}
export function* watchDeleteNote() {
    yield takeLatest(FolderActionTypes.FOLDER_DEL_NOTE, deleteNote);
}

export function noteSagas(): Generator<any>[] {
    return [watchAddNote(), watchGetAllNotes(), watchGetNote(), watchUpdateNote(), watchDeleteNote()];
}
