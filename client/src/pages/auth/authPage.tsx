import { SignupForm } from '../../components/forms/SignupForm';
import loginPhoto from '../../assets/loginn.png';
import { useDispatch } from 'react-redux';
import { SetUser } from '../../redux/features/auth/authSlice';
import { createUserApi, loginUserApi } from '../../services/api/authApi';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/util/toast/Toast';
import { SigninForm } from '@/components/forms/SigninForm';
import { useState } from 'react';

export const AuthPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();
  const loginUser = async (data: { email: string; password: string }) => {
    try {
      console.log('signup');
      const res = await loginUserApi(data);
      showToast.success('Login Successfull');
      dispatch(SetUser({ email: res.data.email, id: res.data.id }));
      navigate('home');
    } catch (error: any) {
      showToast.error(error.response.data.errors[0]);
    }
  };
  const createUser = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }) => {
    try {
      console.log(data);
      const res = await createUserApi(data);
      showToast.success('Signup Successfull');
      dispatch(SetUser({ email: res.data.email, id: res.data.id }));
      navigate('home');
    } catch (error: any) {
      console.log(error);
      showToast.error(error.response.data.errors[0]);
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-rose-50 p-4  overflow-hidden">
      <div className="w-full max-w-[1000px] min-h-[500px] flex rounded-3xl overflow-hidden bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] relative z-10">
        <div className="  rounded-md bg-[#FBF9FE] relative flex flex-col items-center justify-center antialiased">
          <div className="max-w-2xl w-full">
            <img
              src={loginPhoto}
              alt="Login"
              className="w-full h-auto object-fill"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="text-right mb-8">
            <span className="text-sm text-slate-600">
              {login ? 'Not a member?' : 'Already a member'}{' '}
            </span>
            <button
              onClick={() => {
                setLogin(!login);
              }}
              className="text-[#716990] font-medium hover:text-[#4b3a82]"
            >
              {login ? 'Register now' : 'Login'}
            </button>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#53418D] to-[#d3cbf0] bg-clip-text text-transparent mb-2">
              Hello Again!
            </h1>
          </div>
          {login ? (
            <SigninForm onSubmit={loginUser} />
          ) : (
            <SignupForm onSubmit={createUser} />
          )}
        </div>
      </div>
    </div>
  );
};