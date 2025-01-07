import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import PlatformIcon from '../platform/PlatformIcon';
import type { Post } from '../../types/post';

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  return (
    <div 
      onClick={() => onClick(post)}
      className="p-3 mb-2 bg-white rounded-lg border border-gray-200 hover:shadow-lg hover-transition cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <PlatformIcon platform={post.platform} className="w-5 h-5 text-gray-600" />
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          post.status === 'approved' 
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-orange-50 text-orange-700 border border-orange-200'
        }`}>
          <div className="flex items-center space-x-1">
            {post.status === 'approved' ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <Clock className="w-3 h-3" />
            )}
            <span>{post.status === 'approved' ? 'Approved' : 'In Review'}</span>
          </div>
        </div>
      </div>
      
      <h3 className="font-medium text-vektrus-gray-dark mb-1">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{post.description}</p>
      
      {post.image && (
        <div className="mb-2">
          <img
            src={post.image}
            alt="Post preview"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className="text-xs text-gray-500">{post.time}</div>
    </div>
  );
}