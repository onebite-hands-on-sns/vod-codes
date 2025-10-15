import PostEditorModal from "@/components/modal/post-editor-modal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <PostEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
