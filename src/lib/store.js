import { create } from 'zustand';

export const useBookmarkStore = create((set) => ({
  bookmarks: [],
  addBookmark: (user) => set((state) => ({ bookmarks: [...state.bookmarks, user] })),
  removeBookmark: (userId) =>
    set((state) => ({ bookmarks: state.bookmarks.filter((user) => user.id !== userId) })),
}));