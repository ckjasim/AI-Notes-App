import { baseURL } from '../interceptors/api';

export const enhanceApi = async (
  enhancementPrompt: string,
  localContent: string
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_OPENROUTER_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'system',
            content:
              "You are an expert content enhancer. Follow the given instruction carefully while improving the content's quality, clarity, and coherence.",
          },
          {
            role: 'user',
            content: `${enhancementPrompt}\n\nContent:\n${localContent}`,
          },
        ],
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error enhancing note:', error);
  }
};
export const updatePositionApi = async (position: any, id: string) => {
  try {
    const response = await baseURL.put(`notes/${id}/position`, position);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
export const deleteNoteApi = async (id: string) => {
  try {
    const response = await baseURL.delete(`notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
export const saveNoteApi = async (data: any) => {
  try {
    const response = await baseURL.post(`notes`, data);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
export const updateNoteApi = async (data: any, id: string) => {
  try {
    const response = await baseURL.put(`notes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
export const fetchNoteApi = async (id: string) => {
  try {
    const response = await baseURL.get(`notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
