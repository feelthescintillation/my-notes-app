import { Note } from './../model/note';
export interface NoteListState {
    selectedNoteIndex?: number;
    toggleAdd: boolean;
    // noteData: Note
}
