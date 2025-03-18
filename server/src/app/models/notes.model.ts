import mongoose from "mongoose";

export interface NoteAttrs {

    title: string;
    content: string;
    userId: string;
    position: { x: number; y: number };
}

export interface NoteDoc extends mongoose.Document {
    id: string;
    type: string;
    userId:string
    position: { x: number; y: number };
    data: { title: string; content: string };
}

export interface NoteModel extends mongoose.Model<NoteDoc> {
    build(attrs: NoteAttrs): NoteDoc;
}
