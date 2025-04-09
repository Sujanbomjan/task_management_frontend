import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

const deleteTask = async (id: string) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

export const useDeleteTask = () => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: string) => deleteTask(data),
    onSuccess: () => {
      client.invalidateQueries({
        predicate: (query) => {
          return ["tasks"].includes(query.queryKey[0] as string);
        },
      });
    },
  });
  return mutation;
};
