import mongoose from "mongoose";

export interface UserAttrs{
    email: string;
    name: string;
    password: string;
   
}

export interface UserDoc extends mongoose.Document{
    id: string;
    email: string;
    name: string;
    password: string;

}  

export interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc
}