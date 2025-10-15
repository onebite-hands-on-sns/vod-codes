import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  isLoading: false,
  status: null,
  error: null,
  posts: null,
};

const usePostsRequestStore = create(
  combine(initialState, () => ({
    actions: {
      toggleIsLoading: () => {
        // ...
      },
      setStatus: () => {
        // ...
      },
      fetchPosts: () => {
        // ...
      },
    },
  })),
);
