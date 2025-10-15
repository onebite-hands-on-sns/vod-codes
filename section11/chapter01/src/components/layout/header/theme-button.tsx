import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Theme } from "@/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { SunIcon } from "lucide-react";

const THEMES: Theme[] = ["system", "dark", "light"];

export default function ThemeButton() {
  const onChangeTheme = (theme: Theme) => {
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
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="hover:bg-muted cursor-pointer rounded-full p-2">
          <SunIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-35 p-0">
        {THEMES.map((theme) => (
          <PopoverClose key={`theme-button-${theme}`} asChild>
            <div
              onClick={() => onChangeTheme(theme)}
              className="hover:bg-muted cursor-pointer p-3"
            >
              {theme}
            </div>
          </PopoverClose>
        ))}
      </PopoverContent>
    </Popover>
  );
}
