import { Link } from "react-router";
import defaultAvatar from "@/assets/default-avatar.png";
import type { Comment, NestedComment } from "@/types";
import { formatTimeAgo } from "@/lib/time";
import { useSession } from "@/store/session";
import { useState } from "react";
import CommentEditor from "@/components/comment/comment-editor";
import { useDeleteComment } from "@/hooks/mutations/comment/use-delete-comment";
import { toast } from "sonner";
import { useOpenAlertModal } from "@/store/alert-modal";

export default function CommentItem(props: NestedComment) {
  const session = useSession();
  const openAlertModal = useOpenAlertModal();

  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment({
      onError: (error) => {
        toast.error("댓글 삭제에 실패했습니다", {
          position: "top-center",
        });
      },
    });

  const [isEditing, setIsEditing] = useState(false);
  const [isReply, setIsReply] = useState(false);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const toggleIsReply = () => {
    setIsReply(!isReply);
  };

  const handleDeleteClick = () => {
    openAlertModal({
      title: "댓글 삭제",
      description: "삭제된 댓글은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => {
        deleteComment(props.id);
      },
    });
  };

  const isMine = session?.user.id === props.author_id;
  const isRootComment = props.parentComment === undefined;
  const isOverTwoLevels = props.parent_comment_id !== props.root_comment_id;

  return (
    <div
      className={`flex flex-col gap-8 pb-5 ${isRootComment ? "border-b" : "ml-6"}`}
    >
      <div className="flex items-start gap-4">
        <Link to={"#"}>
          <div className="flex h-full flex-col">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={props.author.avatar_url || defaultAvatar}
            />
          </div>
        </Link>
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">{props.author.nickname}</div>
          {isEditing ? (
            <CommentEditor
              type={"EDIT"}
              commentId={props.id}
              initialContent={props.content}
              onClose={toggleIsEditing}
            />
          ) : (
            <div>
              {isOverTwoLevels && (
                <span className="font-bold text-blue-500">
                  @{props.parentComment?.author.nickname}&nbsp;
                </span>
              )}
              {props.content}
            </div>
          )}
          <div className="text-muted-foreground flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                onClick={toggleIsReply}
                className="cursor-pointer hover:underline"
              >
                댓글
              </div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div>{formatTimeAgo(props.created_at)}</div>
            </div>
            <div className="flex items-center gap-2">
              {isMine && (
                <>
                  <div
                    onClick={toggleIsEditing}
                    className="cursor-pointer hover:underline"
                  >
                    수정
                  </div>
                  <div className="bg-border h-[13px] w-[2px]"></div>
                  <div
                    onClick={handleDeleteClick}
                    className="cursor-pointer hover:underline"
                  >
                    삭제
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isReply && (
        <CommentEditor
          type={"REPLY"}
          postId={props.post_id}
          parentCommentId={props.id}
          rootCommentId={props.root_comment_id || props.id}
          onClose={toggleIsReply}
        />
      )}
      {props.children.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
