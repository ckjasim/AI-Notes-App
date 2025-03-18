import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import Password from "../utils/password";
import { CommonMessages, HttpStatusCode, sendResponse } from "../utils/send-response";
import { CustomError } from "../utils/custom-error";


export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    const { email,password } = req.body


    const existingUser = await userService.findUserByEmail(email);
    console.log('jjjjjjjjjjjjj')
    console.log(existingUser,'ddddddd')
    if (!existingUser) {
      throw new CustomError("User not exists! Please signup", 400);
    }

    const hashedPassword = await Password.compare(existingUser.password,password);
    if (!hashedPassword) {
      throw new CustomError("Invalid Password", 400);
    }

 
    sendResponse(res, HttpStatusCode.VERIFIED, CommonMessages.SUCCESS, {
      id: existingUser.id,
      email: existingUser.email,
    });
  } catch (error) {
    next(error);
  }
};
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    const { email,name,password } = req.body


    const existingUser = await userService.findUserByEmail(email);
    console.log('jjjjjjjjjjjjj')
    if (existingUser) {
      throw new CustomError("User already exists in this email !", 400);
    }
    console.log('jjjjjjjjjjjjj')

    const hashedPassword = await Password.toHash(password);
    const newUser = await userService.createUser({
      email,
      password: hashedPassword,
      name
    });

    console.log(newUser)
    sendResponse(res, HttpStatusCode.CREATED, CommonMessages.CREATED, {
      id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const userData = await userService.findUserById(id);
    if (userData) {
      sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, userData);
    }else{
      throw new CustomError("Invalid Link", 400);
    }
  } catch (error) {
    next(error);
  }
};
