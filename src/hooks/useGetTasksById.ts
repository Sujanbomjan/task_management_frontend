import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const getTaskById = async (id: string) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

export const useGetTaskById = (id: string) => {
  return useQuery({ queryKey: ["tasks"], queryFn: () => getTaskById(id) });
};
