import React from 'react';
import PostCard from './PostCard';
import PostModal from '../modal/PostModal';
import { usePostModal } from '../../hooks/usePostModal';
import { usePostContext } from '../../context/PostContext';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  isSameDay
} from 'date-fns';
import type { PostUpdate } from '../../types/post';

interface MonthlyCalendarProps {
  currentDate: Date;
}

export default function MonthlyCalendar({ currentDate }: MonthlyCalendarProps) {
  const { posts, updatePost } = usePostContext();
  const { isOpen, selectedPost, openModal, closeModal } = usePostModal();

  // Get the first day of the month
  const monthStart = startOfMonth(currentDate);
  // Get the last day of the month
  const monthEnd = endOfMonth(currentDate);
  // Get the start of the first week
  const calendarStart = startOfWeek(monthStart);
  // Get the end of the last week
  const calendarEnd = endOfWeek(monthEnd);
  
  // Get all days that should be displayed in the calendar
  const calendarDays = eachDayOfInterval({ 
    start: calendarStart, 
    end: calendarEnd 
  });

  const getPostsForDay = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), post.day);
      return isSameDay(postDate, date);
    });
  };

  const handleUpdatePost = (id: number, updates: PostUpdate) => {
    updatePost(id, updates);
    closeModal();
  };

  return (
    <>
      <div className="grid grid-cols-7 flex-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="border-b border-r border-gray-200 p-2 text-center">
            <span className="text-sm font-medium text-gray-600">{day}</span>
          </div>
        ))}
        
        {calendarDays.map((date) => {
          const dayPosts = getPostsForDay(date);
          const isCurrentMonth = isSameMonth(date, currentDate);
          
          return (
            <div
              key={date.toISOString()}
              className={`border-b border-r border-gray-200 min-h-[120px] p-2 ${
                !isCurrentMonth ? 'bg-gray-50' : ''
              }`}
            >
              <span className={`text-sm block mb-2 ${
                isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {format(date, 'd')}
              </span>
              
              <div className="space-y-1">
                {dayPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => openModal(post)}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        post.status === 'approved' ? 'bg-green-500' : 'bg-orange-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-vektrus-blue transition-colors">
                        {post.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 ml-4">
                      {post.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
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