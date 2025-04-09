import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

interface SignupData {
  email: string;
  username: string;
  password: string;
}

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) => api.post('auth/register', data),
  });
};