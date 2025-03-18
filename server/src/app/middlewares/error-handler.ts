import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error';

const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
): any=>{
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      errors: [err.message]
    });
  }
  return res.status(500).json({
    success: false,
    errors: ['Something went wrong. Please try again later.']
  });
};

export default errorHandler;