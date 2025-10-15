import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      // 1. 포스트 리스트 캐시 <- 현재 삭제된 포스트의 아이디를 제거
      queryClient.setQueryData<InfiniteData<number[]>>(
        QUERY_KEYS.post.list,
        (prev) => {
          if (!prev)
            throw new Error(
              "포스트 리스트를 캐시 데이터에서 찾을 수 없습니다.",
            );

          return {
            ...prev,
            pages: prev.pages.map((page) => {
              if (page.includes(deletedPost.id)) {
                return page.filter((id) => id !== deletedPost.id);
              }
              return page;
            }),
          };
        },
      );

      // 2. 정규화된 포스트 데이터도 제거
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.post.byId(deletedPost.id),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
