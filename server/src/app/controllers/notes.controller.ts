import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import Password from "../utils/password";
import { CommonMessages, HttpStatusCode, sendResponse } from "../utils/send-response";
import { CustomError } from "../utils/custom-error";
import noteService from "../services/note.service";

export const fetchNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id}=req.params

    const allNotes= await noteService.fetchNoteByUserId(id);
    sendResponse(res, HttpStatusCode.CREATED, CommonMessages.CREATED, {allNotes});
  } catch (error) {
    next(error);
  }
};
export const saveNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    const { position,data ,userId} = req.body.node
const {title,content}=data
    const newNote= await noteService.saveNote({
      title,content,position,userId
    });

    sendResponse(res, HttpStatusCode.CREATED, CommonMessages.CREATED, {newNote});
  } catch (error) {
    next(error);
  }
};

export const   updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id}= req.params
  const r =await noteService.updateNoteById(id,req.body);
console.log(r,'kjkjkjkjjjjjjjjjjjjjjjj')
  sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, {});

  } catch (error) {
    next(error);
  }
};
export const   deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id}= req.params
  const r =await noteService.deleteNoteById(id);

  sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, {});

  } catch (error) {
    next(error);
  }
};
export const   updatePosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id}= req.params
  const position=req.body
    
  await noteService.updatePositionById(id,position);

  sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, {});

  } catch (error) {
    next(error);
  }
};
