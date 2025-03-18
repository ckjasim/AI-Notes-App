import { NoteAttrs, NoteDoc } from '../models/notes.model';
import { Note } from '../models/schema/Notes';
import { User } from '../models/schema/User';
import { UserAttrs, UserDoc } from '../models/user.model';
import { INoteService } from './note.service.interface';
import { IUserService } from './user.service.interface';

export class NoteService implements INoteService {
async  deleteNoteById(id: string): Promise<any> {
return await Note.deleteOne({_id:id})
  }

  async updateNoteById(id: string, data: string): Promise<any> {
    return await Note.findOneAndUpdate(
      { _id: id }, // Use `_id` instead of `id`
      { $set: { data } }, // Use `$set` to update `position`
      { new: true } // Return updated document
  );
  }
 async updatePositionById(id: string, position: string): Promise<any> {
  try {
    return await Note.findOneAndUpdate(
      { _id: id }, // Use `_id` instead of `id`
      { $set: { position } }, // Use `$set` to update `position`
      { new: true } // Return updated document
  );
  } catch (error) {
    console.log(error)
  }
  }
  async fetchNoteByUserId(id: string): Promise<any> {
    const user = await Note.find({userId:id});
    return user;
  }
  async saveNote(attrs: NoteAttrs): Promise<any> {
    try {
      return await Note.build(attrs).save();
    } catch (error) {
      console.log(error)
      
    }
  }

}

export default new NoteService();
