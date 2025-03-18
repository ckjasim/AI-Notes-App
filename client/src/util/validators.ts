import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')  
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      'Invalid email format'
    )
    .required('Email is required'),
  name: Yup.string()
    .required('Name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email format')  
  .matches(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    'Invalid email format'
  )
  .required('Email is required'),
password: Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required'),
});

