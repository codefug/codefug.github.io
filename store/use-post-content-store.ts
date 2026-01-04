import { create } from "zustand";

interface PostContentState {
  isMounted: boolean;
  setIsMounted: (mounted: boolean) => void;
}

export const usePostContentStore = create<PostContentState>((set) => ({
  isMounted: false,
  setIsMounted: (mounted) => set({ isMounted: mounted }),
}));
