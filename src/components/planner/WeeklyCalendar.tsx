import React from 'react';
import PostCard from './PostCard';
import PostModal from '../modal/PostModal';
import { usePostModal } from '../../hooks/usePostModal';
import { usePostContext } from '../../context/PostContext';
import { startOfWeek, addDays, format } from 'date-fns';
import type { PostUpdate } from '../../types/post';

interface WeeklyCalendarProps {
  currentDate: Date;
}

export default function WeeklyCalendar({ currentDate }: WeeklyCalendarProps) {
  const { posts, updatePost } = usePostContext();
  const { isOpen, selectedPost, openModal, closeModal } = usePostModal();

  const weekStart = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return {
      date: date.getDate(),
      day: format(date, 'EEE')
    };
  });

  const handleUpdatePost = (id: number, updates: PostUpdate) => {
    updatePost(id, updates);
    closeModal();
  };

  return (
    <>
      <div className="grid grid-cols-7 flex-1 divide-x divide-gray-200">
        {days.map(({ date, day }) => (
          <div key={date} className="min-h-[600px]">
            <div className="px-4 py-3 text-center border-b border-gray-200">
              <div className="font-medium text-gray-900">{day}</div>
              <div className="text-sm text-gray-500">{date}</div>
            </div>
            <div className="p-2">
              {posts
                .filter(post => post.day === date)
                .map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post}
                    onClick={openModal}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          isOpen={isOpen}
          onClose={closeModal}
          onSave={handleUpdatePost}
        />
      )}
    </>
  );
}