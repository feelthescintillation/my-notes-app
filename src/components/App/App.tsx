import React from 'react';
import './App.scss';
import { Header } from '../header/header';
import { ConnectedFolderList } from '../folder-list/folder-list';
import { connect } from 'react-redux';
import { UserActionTypes, AppActionTypes } from '../../redux/actions/types';
import { AllFolders } from '../../types/model/folder';
import { User } from '../../types/model/user';
import { ConnectedNoteList } from '../note-list/note-list';
import { NoteApplicationState } from '../../types/state/noteApplicationState';
import { Notes } from '../../types/model/note';
import { ConnectedEditor } from '../editor/editor';

type Props = {
    getUser: () => {};
    getAllFolders: () => {};
    dispatchSelectNote: (noteId: string, folderId?: string) => {};
    selectedFolderId?: string;
    selectedNoteId?: string;
    folderList: AllFolders | null;
    noteList: Notes | null;
    user: User | null;
};
class App extends React.Component<Props, any> {
    componentDidMount() {
        this.props.getUser();
        this.props.getAllFolders();
    }
    componentDidUpdate = (prevProps: Props): void => {
        if (this.props.selectedFolderId !== prevProps.selectedFolderId) {
            this.props.dispatchSelectNote('', this.props.selectedFolderId);
        }
    };
    render() {
        return (
            <div className="App">
                <Header></Header>
                <div className="grid-container">
                    <div className="grid-item">
                        <ConnectedFolderList
                            folders={this.props.folderList}
                            selectedFolder={this.props.selectedFolderId}
                        ></ConnectedFolderList>
                    </div>
                    {this.props.selectedFolderId != null && (
                        <>
                            <div className="grid-item">
                                <ConnectedNoteList
                                    selectedFolder={this.props.selectedFolderId || ''}
                                    selectedNote={this.props.selectedNoteId}
                                    noteList={this.props.noteList}
                                ></ConnectedNoteList>
                            </div>
                            <div className="grid-item">
                                {this.props.noteList && this.props.selectedNoteId != null && (
                                    <ConnectedEditor {...this.props.noteList?.[this.props.selectedNoteId]} />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: NoteApplicationState, ownProps: AllFolders) {
    const appState = state.app;
    return {
        folderList: appState.folderList,
        noteList: appState.noteList,
        user: appState.user,
        selectedFolderId: appState.selectedFolderId,
        selectedNoteId: appState.selectedNoteId,
    };
}
const mapDispatchToProps = (dispatch: any) => ({
    getUser: () =>
        dispatch({
            type: UserActionTypes.GET_USER,
        }),
    getAllFolders: () =>
        dispatch({
            type: AppActionTypes.APP_GET_ALL_FOLDERS,
        }),
    getNoteForFolder: (folderId: string) =>
        dispatch({
            type: AppActionTypes.APP_GET_ALL_FOLDERS,
            payload: folderId,
        }),
    dispatchSelectNote: (noteId: string, folderId?: string) =>
        dispatch({
            type: AppActionTypes.APP_SELECT_NOTE,
            payload: { id: noteId, folderId },
        }),
});
// TODO appconnected name
export const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);
