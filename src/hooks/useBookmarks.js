import { useBookmarkStore } from '@/lib/store';

export const useBookmarks = () => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  return { bookmarks, addBookmark, removeBookmark };
};