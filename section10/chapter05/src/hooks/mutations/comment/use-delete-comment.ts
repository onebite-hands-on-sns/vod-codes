import { deleteComment } from "@/api/comment";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useDeleteComment(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
