'use client';

import Card from '../(components)/Card';
import { useBookmarkStore } from '@/lib/store';

const BookmarksPage = () => {
  const { bookmarks } = useBookmarkStore();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Bookmarked Employees</h1>
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p>No employees bookmarked yet.</p>
      )}
    </div>
  );
};

export default BookmarksPage;