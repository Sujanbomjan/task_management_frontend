import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

interface LoginData {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => api.post('auth/login', data),
  });
};