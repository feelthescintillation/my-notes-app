import React from 'react';
import { EditorState } from '../../types/state/editorState';
import { Note } from '../../types/model/note';
import { connect } from 'react-redux';
import { NoteActionTypes } from '../../redux/actions/types';
import './editor.scss';

interface Props extends Note {
    updateNoteContent: (note: Note) => void;
}
class Editor extends React.Component<Props, EditorState> {
    constructor(props: Props, state: EditorState) {
        super(props, state);
        this.emitChange = this.emitChange.bind(this);
        this.elemRef = React.createRef();
    }
    componentDidMount = (): void => {
        this.updateEditor();
    };
    componentDidUpdate = (prevProps: Props): void => {
        if (this.props !== prevProps) {
            this.updateEditor();
        }
    };
    updateEditor(): void {
        if (this.elemRef.current) {
            this.elemRef.current.innerHTML = this.props.content || '';
        }
        this.setState({ note: { ...this.props } });
        const el = this.elemRef.current;
        if (el) {
            const target = document.createTextNode('');
            el.appendChild(target);
            // do not move caret if element was not focused
            if (target !== null && target.nodeValue !== null) {
                document?.getSelection()?.collapse(target, target.length);
                if (el instanceof HTMLElement) el.focus();
            }
            this.elemRef.current?.focus();
        }
    }

    elemRef: React.RefObject<HTMLInputElement>;
    render(): JSX.Element {
        return (
            <>
                <div
                    className="editor-area"
                    onInput={this.emitChange}
                    onBlur={this.emitChange}
                    ref={this.elemRef}
                    contentEditable
                    onKeyDown={this.emitChange}
                    dangerouslySetInnerHTML={{ __html: this.props.content || '' }}
                ></div>
            </>
        );
    }

    emitChange = (): void => {
        const currentText = this.elemRef.current?.innerHTML || '';
        this.setState({
            note: { ...this.state.note, content: this.formatContent(currentText) },
        });
        this.props.updateNoteContent(this.state.note);
    };
    formatContent(content: string): string {
        if (content) {
            const isContentCoveredinTopDiv = content.match(/<div>[\S\s]*?<\/div>/gi);
            if (!isContentCoveredinTopDiv) {
                content = `<div>${content}</div>`;
            }

            content.replace(/\u21b5/g, '</div><div>');
        }
        return content;
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    updateNoteContent: (note: Note) =>
        dispatch({
            type: NoteActionTypes.NOTE_UPDATE,
            payload: { note },
        }),
});

export const ConnectedEditor = connect(null, mapDispatchToProps)(Editor);
