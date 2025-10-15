import type { Theme } from "@/types";
import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

type State = {
  theme: Theme;
};

const initialState: State = {
  theme: "light",
};

const useThemeStore = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          setTheme: (theme: Theme) => {
            const htmlTag = document.documentElement;
            htmlTag.classList.remove("dark", "light");

            if (theme === "system") {
              const isDarkTheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
              ).matches;

              htmlTag.classList.add(isDarkTheme ? "dark" : "light");
            } else {
              htmlTag.classList.add(theme);
            }

            set({ theme });
          },
        },
      })),
      {
        name: "ThemeStore",
        partialize: (store) => ({
          theme: store.theme,
        }),
      },
    ),
    { name: "ThemeStore" },
  ),
);

export const useTheme = () => {
  const theme = useThemeStore((store) => store.theme);
  return theme;
};

export const useSetTheme = () => {
  const setTheme = useThemeStore((store) => store.actions.setTheme);
  return setTheme;
};
