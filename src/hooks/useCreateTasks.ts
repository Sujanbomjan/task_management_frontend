import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

const createTask = async (taskData: { title: string; description: string }) => {
  const { data } = await api.post("/tasks", taskData);
  return data;
};

export const useCreateTask = () => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { title: string; description: string }) =>
      createTask(data),
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
