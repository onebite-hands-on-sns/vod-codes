import useTogglePostLike from "@/hooks/mutations/post/use-toggle-post-like";
import { useSession } from "@/store/session";
import { HeartIcon } from "lucide-react";
import { toast } from "sonner";

export default function LikePostButton({
  id,
  likeCount,
}: {
  id: number;
  likeCount: number;
}) {
  const session = useSession();

  const { mutate: togglePostLike } = useTogglePostLike({
    onError: (error) => {
      toast.error("좋아요 요청에 실패했습니다", {
        position: "top-center",
      });
    },
  });

  const handleLikeClick = () => {
    togglePostLike({
      postId: id,
      userId: session!.user.id,
    });
  };

  return (
    <div
      onClick={handleLikeClick}
      className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm"
    >
      <HeartIcon className="h-4 w-4" />
      <span>{likeCount}</span>
    </div>
  );
}
