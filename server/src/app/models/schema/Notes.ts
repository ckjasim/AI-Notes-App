 import mongoose from "mongoose";
import { NoteAttrs, NoteDoc, NoteModel } from "../notes.model";

const noteSchema = new mongoose.Schema(
  {
      type: {
          type: String,
          required: true,
          default: "note",
      },
      userId: {
          type: String,
          required: true,
      },
      position: {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
      },
      data: {
          title: { type: String, required: true, trim: true },
          content: { type: String, default: "" },
      },

  },
  {
      toJSON: {
          virtuals: true,
          transform(doc, ret) {
              ret.id = ret._id;
              delete ret._id;
              delete ret.__v;
          },
      },
  }
);


noteSchema.statics.build = (attrs: NoteAttrs) => {
  return new Note({
      type: "note",
      position: attrs.position,
      userId: attrs.userId,
      data: { title: attrs.title, content: attrs.content },
  });
};
const Note = mongoose.model<NoteDoc, NoteModel>("Note", noteSchema);

export { Note };