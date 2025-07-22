'use client';

import Modal from './Modal';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { useBookmarkStore } from '@/lib/store';
import { useState } from 'react';

const Card = ({ user }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const isBookmarked = bookmarks.some((bookmark) => bookmark.id === user.id);

  const handleBookmark = () => {
    isBookmarked ? removeBookmark(user.id) : addBookmark(user);
  };

  const handlePromote = () => {
    setIsFeedbackOpen(true);
  };

  const handleFeedbackSubmit = () => {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '{}');
    feedbacks[user.id] = feedback;
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    setIsFeedbackOpen(false);
    setFeedback('');
    alert('Feedback saved!');
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-dg transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3">
        <Image
          src={user.image && user.image !== '' ? user.image : '/default-avatar.png'}
          alt={user.firstName || 'User'}
          width={60}
          height={60}
          className="rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-indigo-300"
        />
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {user.name || `${user.firstName || ''} ${user.lastName || ''}`}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>

      <div className="my-4 border-t border-gray-200 dark:border-gray-600"></div>

      <div className="space-y-2 text-sm">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-700 dark:text-gray-200">Age:</span> {user.age}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-700 dark:text-gray-200">Dept:</span> {user.department}
        </p>
        {(() => {
          const feedbacks = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('feedbacks') || '{}' : '{}');
          if (feedbacks[user.id]) {
            return (
              <p className="text-sm text-green-600 dark:text-green-400 pt-1">
                <span className="font-medium">Feedback: </span>{feedbacks[user.id]}
              </p>
            );
          }
          return null;
        })()}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < user.rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-500'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.783.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.24 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
            </svg>
          ))}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/employee/${user.id}`}
            className="px-4 py-2 rounded-md bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            Promote
          </Link>
          <button
            onClick={handleBookmark}
            className={`text-sm px-4 py-2 rounded-md transition-colors font-medium ${isBookmarked
                ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/50 dark:text-green-200 dark:hover:bg-green-800/80'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
