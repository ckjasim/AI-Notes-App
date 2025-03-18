import mongoose from "mongoose";

// Define the attributes required to create a Note
export interface NoteAttrs {

    title: string;
    content: string;
    userId: string;
    position: { x: number; y: number };
}

// Define the Note document interface
export interface NoteDoc extends mongoose.Document {
    id: string;
    type: string;
    userId:string
    position: { x: number; y: number };
    data: { title: string; content: string };
}

// Define the Note model interface
export interface NoteModel extends mongoose.Model<NoteDoc> {
    build(attrs: NoteAttrs): NoteDoc;
}
