import { Button } from "@/components/ui/button";
import { useOpenEditPostModal } from "@/store/post-editor-modal";
import type { PostEntity } from "@/types";

export default function EditPostButton(props: PostEntity) {
  const openEditPostModal = useOpenEditPostModal();

  const handleButtonClick = () => {
    openEditPostModal({
      postId: props.id,
      content: props.content,
      imageUrls: props.image_urls,
    });
  };

  return (
    <Button
      onClick={handleButtonClick}
      className="cursor-pointer"
      variant={"ghost"}
    >
      수정
    </Button>
  );
}
