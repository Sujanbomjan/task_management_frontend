import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
      const navigate = useNavigate();
      navigate('/login');
      toast.info("You are logged out. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default api;
