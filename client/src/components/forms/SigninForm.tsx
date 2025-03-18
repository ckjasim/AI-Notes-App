import React, { useState } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { SigninSchema } from '../../util/validators';

interface SigninFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export const SigninForm: React.FC<SigninFormProps> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SigninSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-5">
          <div className="relative">
            <Field name="email">
              {({ field }: FieldProps) => (
                <div className="relative">
                  <input
                    {...field}
                    type="email"
                    placeholder=" "
                    className={`bg-white peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors
                        ${
                          errors.email && touched.email
                            ? 'border-red-500'
                            : 'border-gray-300 focus:border-blue-500'
                        }`}
                  />
                  <label
                    className={`absolute left-3 -top-2.5 bg-white px-1 text-xs transition-all
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
                        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                        ${
                          errors.email && touched.email
                            ? 'text-red-500'
                            : 'text-gray-500'
                        } pointer-events-none`}
                  >
                    Email address
                  </label>
                </div>
              )}
            </Field>
            {errors.email && touched.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>

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
                            ? 'border-red-500'
                            : 'border-gray-300 focus:border-blue-500'
                        }`}
                  />
                  <label
                    className={`absolute left-3 -top-2.5 bg-white px-1 text-xs transition-all
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
                        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                        ${
                          errors.password && touched.password
                            ? 'text-red-500'
                            : 'text-gray-500'
                        } pointer-events-none`}
                  >
                    Password
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
            {errors.password && touched.password && (
              <div className="text-red-500 text-xs mt-1">{errors.password}</div>
            )}
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
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </Form>
      )}
    </Formik>
  );
};