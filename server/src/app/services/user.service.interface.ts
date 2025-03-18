import { UserAttrs, UserDoc } from "../models/user.model";

export interface IUserService{
  findUserByEmail(email: string): Promise<UserDoc | null>;
  createUser(attrs: UserAttrs): Promise<UserDoc>;
  findUserById(id: string): Promise<UserDoc | null> 
}