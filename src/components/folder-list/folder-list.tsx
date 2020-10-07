import React from 'react';
import { AllFolders, Folder } from '../../types/model/folder';
import { FolderListState } from '../../types/state/folderListState';
import { EnterableInput } from '../input/input';
import { AppActionTypes } from '../../redux/actions/types';
import { connect } from 'react-redux';
import { getNewId } from '../../services/common.services';
import { ListItem } from '../list-item/list-item';
import './folder-list.scss';

type Prop = {
    folders: AllFolders | null;
    dispatchAddFolder: (payload: Folder) => {};
    dispatchSelectFolder: (key: string) => {};
    dispatchDeleteFolder: (key: string) => {};
    selectedFolder?: string;
};
class FolderList extends React.Component<Prop, FolderListState> {
    constructor(prop: Prop, state: FolderListState) {
        super(prop, state);
        this.state = { toggleAdd: false };
    }
    render() {
        return (
            <div className="folder-list-container">
                <div
                    className="svg-icon icon-big clickable add-folder"
                    onClick={(e) => this.setState({ toggleAdd: !this.state.toggleAdd })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                    </svg>
                </div>
                {this.state.toggleAdd && (
                    <EnterableInput
                        onEnter={(val) => {
                            val &&
                                this.props.dispatchAddFolder({
                                    id: getNewId('folder'),
                                    name: val,
                                });
                            this.setState({ toggleAdd: !this.state.toggleAdd });
                        }}
                    />
                )}
                <div>
                    {this.props.folders != null &&
                        Object.keys(this.props.folders).map((folderKey) => {
                            return (
                                <ListItem
                                    name={this.props.folders?.[folderKey]?.name || ''}
                                    clickHandler={this.props.dispatchSelectFolder}
                                    itemKey={folderKey}
                                    selected={folderKey === this.props?.selectedFolder}
                                    key={folderKey}
                                    deleteClickHandler={this.props?.dispatchDeleteFolder}
                                ></ListItem>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    dispatchAddFolder: (payload: Folder) =>
        dispatch({
            type: AppActionTypes.APP_ADD_FOLDER,
            payload: payload,
        }),
    dispatchSelectFolder: (folderId: string) =>
        dispatch({
            type: AppActionTypes.APP_SELECT_FOLDER,
            payload: folderId,
        }),
    dispatchDeleteFolder: (folderId: string) =>
        dispatch({
            type: AppActionTypes.APP_DEL_FOLDER,
            payload: folderId,
        }),
});
// function mapStateToProps(
//   noteApplicationState: NoteApplicationState,
//   ownProps: Prop
// ) {
//   const appState = noteApplicationState.app;
//   return {
//     user: appState.user,
//     selectedFolderId: appState.selectedFolderId,
//     selectedNoteId: appState.selectedNoteId,
//   };
// }

export const ConnectedFolderList = connect(null, mapDispatchToProps)(FolderList);
