import Link from 'next/link';
import Button from './Button';
import { useBookmarkStore } from '@/lib/store';

const Card = ({ user }) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const isBookmarked = bookmarks.some((bookmark) => bookmark.id === user.id);

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200 hover:bg-gray-300 dark:hover:bg-gray-700">
      <div className="flex items-center space-x-4">
        <img src={user.image} alt={user.firstName} className="w-16 h-16 rounded-full" />
        <div>

          <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Age: {user.age} | Dept: {user.department}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < user.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.783.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.24 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
            </svg>
          ))}
        </div>
        <div className="flex space-x-2">
          <Link href={`/employee/${user.id}`}>
            <Button className="text-sm">View</Button>
          </Link>
          <Button onClick={handleBookmark} className="text-sm bg-green-500 hover:bg-green-600">
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;