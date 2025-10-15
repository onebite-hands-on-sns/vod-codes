import { createTodo } from "@/api/create-todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
      window.location.reload()
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
