import React, { useState } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { signupSchema } from '../../util/validators';

interface SignupFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    const checks = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    };
    const strength = Object.values(checks).filter(Boolean).length;
    return strength;
  };

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signupSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, values }) => (
        <Form className="space-y-5">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">
              Contact details
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <div className="relative">
                      <input
                        {...field}
                        type="text"
                        placeholder=" "
                        className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white
                            ${
                              errors.name && touched.name
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:border-blue-500'
                            }
                          `}
                      />
                      <label
                        className={`absolute left-3 -top-2.5 bg-white px-1 text-xs transition-all
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
                            peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                            ${
                              errors.name && touched.name
                                ? 'text-red-500 peer-focus:text-red-500'
                                : 'text-gray-500'
                            }
                            pointer-events-none
                          `}
                      >
                        Name
                      </label>
                    </div>
                  )}
                </Field>
                {errors.name && touched.name && (
                  <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                )}
              </div>
              <div className="relative">
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <div className="relative">
                      <input
                        {...field}
                        type="email"
                        placeholder=" "
                        className={`  bg-white peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors
                            ${
                              errors.email && touched.email
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:border-blue-500'
                            }
                          `}
                      />
                      <label
                        className={`absolute left-3 -top-2.5 bg-white px-1 text-xs transition-all
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
                            peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                            ${
                              errors.email && touched.email
                                ? 'text-red-500 peer-focus:text-red-500'
                                : 'text-gray-500'
                            }
                            pointer-events-none
                          `}
                      >
                        Email address
                      </label>
                    </div>
                  )}
                </Field>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">
              Set a password
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder=" "
                        className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white
                            ${
                              errors.password && touched.password
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:border-blue-500'
                            }
                          `}
                      />
                      <label
                        className={`absolute left-3 -top-2.5 bg-white px-1 text-xs transition-all
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
                            peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                            ${
                              errors.password && touched.password
                                ? 'text-red-500 peer-focus:text-red-500'
                                : 'text-gray-500'
                            }
                            pointer-events-none
                          `}
                      >
                        Create a password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  )}
                </Field>
                {values.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded-full ${
                            index <= getPasswordStrength(values.password)
                              ? 'bg-green-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      Password must contain:
                      <ul className="mt-1">
                        <li
                          className={
                            values.password.length >= 6 ? 'text-green-500' : ''
                          }
                        >
                          • At least 6 characters
                        </li>
                        <li
                          className={
                            /[A-Z]/.test(values.password)
                              ? 'text-green-500'
                              : ''
                          }
                        >
                          • One uppercase letter
                        </li>
                        <li
                          className={
                            /[a-z]/.test(values.password)
                              ? 'text-green-500'
                              : ''
                          }
                        >
                          • One lowercase letter
                        </li>
                        <li
                          className={
                            /\d/.test(values.password) ? 'text-green-500' : ''
                          }
                        >
                          • One number
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {errors.password && touched.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="relative">
                <Field name="confirmPassword">
                  {({ field }: FieldProps) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder=" "
                        className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white
                            ${
                              errors.confirmPassword && touched.confirmPassword
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:border-blue-500'
                            }
                          `}
                      />
                      <label
                        className={`absolute left-3 -top-2.5 bg-white px-1 text-xs transition-all
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
                            peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                            ${
                              errors.confirmPassword && touched.confirmPassword
                                ? 'text-red-500 peer-focus:text-red-500'
                                : 'text-gray-500'
                            }
                            pointer-events-none
                          `}
                      >
                        Confirm your password
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-2.5 text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  )}
                </Field>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#53418ddc] text-white text-sm py-3 px-4 rounded-lg transition-colors ${
              isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#4b3a82]'
            }`}
          >
            {isSubmitting ? 'Creating account...' : 'Create your account'}
          </button>
        </Form>
      )}
    </Formik>
  );
};