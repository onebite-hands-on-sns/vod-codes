import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { useUpdateComment } from "@/hooks/mutations/comment/use-update-comment";

type CreateMode = {
  type: "CREATE";
  postId: number;
};

type EditMode = {
  type: "EDIT";
  commentId: number;
  initialContent: string;
  onClose: () => void;
};

type Props = CreateMode | EditMode;

export default function CommentEditor(props: Props) {
  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCreateComment({
      onSuccess: () => {
        setContent("");
      },
      onError: (error) => {
        toast.error("댓글 추가에 실패했습니다", {
          position: "top-center",
        });
      },
    });

  const { mutate: updateComment, isPending: isUpdateCommentPending } =
    useUpdateComment({
      onSuccess: () => {
        (props as EditMode).onClose();
      },
      onError: (error) => {
        toast.error("댓글 수정에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const [content, setContent] = useState("");

  useEffect(() => {
    if (props.type === "EDIT") {
      setContent(props.initialContent);
    }
  }, []);

  const handleSubmitClick = () => {
    if (content.trim() === "") return;

    if (props.type === "CREATE") {
      createComment({
        postId: props.postId,
        content,
      });
    } else {
      updateComment({
        id: props.commentId,
        content,
      });
    }
  };

  const isPending = isCreateCommentPending || isUpdateCommentPending;

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        disabled={isPending}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        {props.type === "EDIT" && (
          <Button
            disabled={isPending}
            variant={"outline"}
            onClick={() => props.onClose()}
          >
            취소
          </Button>
        )}
        <Button disabled={isPending} onClick={handleSubmitClick}>
          작성
        </Button>
      </div>
    </div>
  );
}
