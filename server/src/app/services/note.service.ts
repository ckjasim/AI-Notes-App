import { NoteAttrs } from '../models/notes.model';
import { Note } from '../models/schema/Notes';

import { INoteService } from './note.service.interface';

export class NoteService implements INoteService {
  async deleteNoteById(id: string): Promise<any> {
    return await Note.deleteOne({ _id: id });
  }

  async updateNoteById(id: string, data: string): Promise<any> {
    return await Note.findOneAndUpdate(
      { _id: id },
      { $set: { data } },
      { new: true }
    );
  }
  async updatePositionById(id: string, position: string): Promise<any> {
    try {
      return await Note.findOneAndUpdate(
        { _id: id },
        { $set: { position } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async fetchNoteByUserId(id: string): Promise<any> {
    const user = await Note.find({ userId: id });
    return user;
  }
  async saveNote(attrs: NoteAttrs): Promise<any> {
    try {
      return await Note.build(attrs).save();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new NoteService();
