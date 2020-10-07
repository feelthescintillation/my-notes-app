import React from 'react';
import { NoteListState } from '../../types/state/noteListState';
import { Note, Notes } from '../../types/model/note';
import './note-list.scss';
import { connect } from 'react-redux';

import { AppActionTypes, FolderActionTypes } from '../../redux/actions/types';
import { EnterableInput } from '../input/input';
import { getNewId } from '../../services/common.services';
import { ListItem } from '../list-item/list-item';

type Prop = {
    dispatchAddNote: (payload: Note) => void;
    dispatchSelectNote: (noteId: string, folderId: string) => void;
    dispatchDeleteNote: (payload?: Note) => void;
    selectedFolder: string;
    selectedNote?: string;
    noteList: Notes | null;
};
class NoteList extends React.Component<Prop, NoteListState> {
    constructor(prop: Prop, state: NoteListState) {
        super(prop, state);
        this.state = { toggleAdd: false };
    }

    selectNote = (noteId: string) => {
        this.props.dispatchSelectNote(noteId, this.props.selectedFolder);
    };

    dispatchDeleteNote = (noteId: string): void => {
        this.props.dispatchDeleteNote(this.props.noteList?.[noteId]);
    };

    render() {
        return (
            <div className="note-list-container">
                <div
                    className="svg-icon icon-big clickable add-note"
                    onClick={(e) => this.setState({ toggleAdd: !this.state.toggleAdd })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                {this.state.toggleAdd && (
                    <EnterableInput
                        onEnter={(val) => {
                            val &&
                                this.props.dispatchAddNote({
                                    id: getNewId('note'),
                                    name: val,
                                    folderId: this.props.selectedFolder,
                                });
                            this.setState({ toggleAdd: !this.state.toggleAdd });
                        }}
                    />
                )}
                <div>
                    {this.props.noteList != null &&
                        Object.keys(this.props.noteList).map((noteKey) => {
                            return (
                                <ListItem
                                    name={this.props.noteList?.[noteKey]?.name || ''}
                                    clickHandler={this.selectNote}
                                    itemKey={noteKey}
                                    selected={noteKey === this.props?.selectedNote}
                                    key={noteKey}
                                    deleteClickHandler={this.dispatchDeleteNote}
                                ></ListItem>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    dispatchAddNote: (payload: Note): void =>
        dispatch({
            type: FolderActionTypes.FOLDER_ADD_NOTE,
            payload: payload,
        }),
    dispatchSelectNote: (noteId: string, folderId: string): void =>
        dispatch({
            type: AppActionTypes.APP_SELECT_NOTE,
            payload: { id: noteId, folderId },
        }),
    dispatchDeleteNote: (payload?: Note): void =>
        dispatch({
            type: FolderActionTypes.FOLDER_DEL_NOTE,
            payload,
        }),
});

export const ConnectedNoteList = connect(null, mapDispatchToProps)(NoteList);
