import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

const updateTask = async (
  id: string,
  taskData: { title: string; description: string }
) => {
  const { data } = await api.put(`/tasks/${id}`, taskData);
  return data;
};

export const useUpdateTask = () => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { id: string; title: string; description: string }) =>
      updateTask(data.id, { title: data.title, description: data.description }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return mutation;
};
