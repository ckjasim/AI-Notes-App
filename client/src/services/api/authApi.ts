import { baseURL } from '../interceptors/api';


export const loginUserApi = async (data: any) => {
  try {
    const response = await baseURL.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
export const createUserApi = async (data: any) => {
  try {
    const response = await baseURL.post('/auth', data);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};


