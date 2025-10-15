import { Button } from "@/components/ui/button";
import { useOpenProfileEditorModal } from "@/store/profile-editor-modal";

export default function EditProfileButton() {
  const openProfileEditorModal = useOpenProfileEditorModal();

  return (
    <Button
      onClick={openProfileEditorModal}
      variant={"secondary"}
      className="cursor-pointer"
    >
      프로필 수정
    </Button>
  );
}
