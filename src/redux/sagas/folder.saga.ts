import { BaseAction } from '../actions/baseAction';
import { AppActionTypes, FolderActionTypes } from '../actions/types';
import { put, takeLatest, call } from 'redux-saga/effects';
import * as Services from '../../services/folder.services';
import { Folder } from '../../types/model/folder';

function* getAllFolders() {
    const allFolders = yield call(Services.getAllFolders);
    yield put({
        type: AppActionTypes.APP_ALL_FOLDERS_RECIEVED,
        payload: allFolders,
    });
}

function* updateFolder(action: BaseAction) {
    const folder = action.payload as Folder;
    const updated = yield call(Services.updateFolder, folder.id, folder);
    yield put({
        type: AppActionTypes.APP_ALL_FOLDERS_RECIEVED,
        payload: updated,
    });
}

function* deleteFolder(action: BaseAction) {
    const folderId = action.payload as string;
    const updated = yield call(Services.updateFolder, folderId, null, true);
    yield put({
        type: AppActionTypes.APP_ALL_FOLDERS_RECIEVED,
        payload: updated,
    });
}

function* selectFolder(action: BaseAction) {
    const folderId = action.payload as string;
    yield put({
        type: FolderActionTypes.FOLDER_GET_ALL_NOTES,
        payload: folderId,
    });
}
export function* watchUpdateFolder() {
    yield takeLatest(AppActionTypes.APP_ADD_FOLDER, updateFolder);
}

export function* watchDeleteFolder() {
    yield takeLatest(AppActionTypes.APP_DEL_FOLDER, deleteFolder);
}
export function* watchGetAllFolders() {
    yield takeLatest(AppActionTypes.APP_GET_ALL_FOLDERS, getAllFolders);
}
export function* watchSelectFolder() {
    yield takeLatest(AppActionTypes.APP_SELECT_FOLDER, selectFolder);
}

export function folderSagas(): Generator<any>[] {
    return [watchGetAllFolders(), watchUpdateFolder(), watchDeleteFolder(), watchSelectFolder()];
}
