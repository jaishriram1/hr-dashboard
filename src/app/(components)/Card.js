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

  const handleBookmark = (e) => {
    if (isBookmarked) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  const handlePromote = (e) => {
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
    <div>
      <div className="block p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200 hover:ring-2 hover:ring-blue-500"
      >
        <div className="flex items-center space-x-4">
          <Image
            src={user.image && user.image !== '' ? user.image : '/default-avatar.png'}
            alt={user.firstName || 'User'}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{user.name ? user.name : `${user.firstName || ''} ${user.lastName || ''}`}</h2>
           
            {(() => {
              const feedbacks = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('feedbacks') || '{}' : '{}');
              if (feedbacks[user.id]) {
                return <p className="text-sm text-green-600 dark:text-green-400 mt-1">Feedback: {feedbacks[user.id]}</p>;
              }
              return null;
            })()}
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Age: {user.age} | Dept: {user.department}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-5 h-5 ${i < user.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.783.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.24 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
              </svg>
            ))}
          </div>
          <div className="flex space-x-2">
            <Link href={`/employee/${user.id}`} className="px-4 py-2 font-semibold text-grey bg-blue-500 rounded-md bg-indigo-500 hover:bg-indigo-600">
              Promote
            </Link>
            <Button
              onClick={handleBookmark}
              className={`text-sm ${isBookmarked ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'}`}
            >
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Card;