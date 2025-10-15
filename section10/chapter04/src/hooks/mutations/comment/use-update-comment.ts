import { updateComment } from "@/api/comment";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdateComment(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
