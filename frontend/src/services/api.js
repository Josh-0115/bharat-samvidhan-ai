import axios from 'axios';

// Create an instance pointing to your backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Auth Services
export const loginUser = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data; // Should return { token, user }
};

export const registerUser = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

// Chat Services
export const sendChatMessage = async (message, language, sessionId = null) => {
  const res = await api.post('/chat/message', { message, language, sessionId });
  return res.data; // { text, sources, sessionId, chat }
};

export const getChatHistory = async () => {
  const res = await api.get('/chat/history');
  return res.data;
};

export default api;