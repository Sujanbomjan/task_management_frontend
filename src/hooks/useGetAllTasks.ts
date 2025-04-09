import { useQuery } from "@tanstack/react-query";
import api from '@/lib/api';

const getAllTasks = async () => {
  const { data } = await api.get('/tasks');
  return data;
};

export const useGetAllTasks = () => {
  return useQuery({ queryKey: ['tasks'], queryFn: getAllTasks });
};
