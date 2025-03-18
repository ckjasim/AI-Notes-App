import { NoteAttrs, NoteDoc } from "../models/notes.model";


export interface INoteService{

  saveNote(attrs: NoteAttrs): Promise<NoteDoc>;
  updatePositionById(id:string,position: string): Promise<NoteDoc>;
  updateNoteById(id:string,data: string): Promise<NoteDoc>;
  deleteNoteById(id:string): Promise<void>;
  fetchNoteByUserId(id:string): Promise<NoteDoc|null>;

}