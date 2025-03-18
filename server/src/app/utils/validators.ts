import { Request } from 'express';
import { check, ValidationChain } from 'express-validator';



const userValidator: ValidationChain[] = [
  // Signup Validations
  check('email')
    .isEmail()
    .withMessage('Invalid email format')
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    .withMessage('Invalid email format')
    .notEmpty()
    .withMessage('Email is required'),

  check('name')
    .notEmpty()
    .withMessage('Name is required'),

  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .notEmpty()
    .withMessage('Password is required'),

  check('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    })
    .notEmpty()
    .withMessage('Confirm password is required'),

  // Personal Info Validations
 
];
export {  userValidator };
