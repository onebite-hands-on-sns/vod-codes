import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    {
      name: "postEditorModalStore",
    },
  ),
);

export const useOpenPostEditorModal = () => {
  const open = usePostEditorModalStore((store) => store.actions.open);
  return open;
};

export const usePostEditorModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = usePostEditorModalStore();

  return {
    isOpen,
    open,
    close,
  };
};
