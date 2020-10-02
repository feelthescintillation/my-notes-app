import React from "react";
import { EditorState } from "../../types/state/editorState";
import { Note } from "../../types/model/note";
import { connect } from "react-redux";
import { NoteActionTypes } from "../../redux/actions/types";
import "./editor.scss";

interface props extends Note {
  updateNoteContent: (note: Note) => void;
}
class Editor extends React.Component<props, EditorState> {
  constructor(props: props, state: EditorState) {
    super(props, state);
    this.emitChange = this.emitChange.bind(this);
    this.elemRef = React.createRef();
  }
  componentDidMount = () => {
    this.updateEditor();
  };
  componentDidUpdate = (prevProps: props) => {
    if (this.props !== prevProps) {
      this.updateEditor();
    }
  };
  updateEditor() {
    if (this.elemRef.current) {
      this.elemRef.current.innerHTML = this.props.content || "";
    }
    this.setState({ note: { ...this.props } });
  }

  elemRef: React.RefObject<HTMLInputElement>;
  render() {
    return (
      <>
        <div
          className="editor-area"
          onInput={this.emitChange}
          onBlur={this.emitChange}
          ref={this.elemRef}
          contentEditable
          onKeyDown={this.emitChange}
          dangerouslySetInnerHTML={{ __html: this.props.content || "" }}
        ></div>
      </>
    );
  }

  emitChange = (evt: any) => {
    const currentText = this.elemRef.current?.innerText;
    this.setState({ note: { ...this.state.note, content: currentText } });
    this.props.updateNoteContent(this.state.note);
  };
}
const mapDispatchToProps = (dispatch: any) => ({
  updateNoteContent: (note: Note) =>
    dispatch({
      type: NoteActionTypes.NOTE_UPDATE,
      payload: { note },
    }),
});
export const ConnectedEditor = connect(null, mapDispatchToProps)(Editor);
