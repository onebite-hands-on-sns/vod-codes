import { type Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
