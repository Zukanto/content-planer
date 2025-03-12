import React, { useState } from 'react';
import Modal from './Modal';
import DatePicker from './pickers/DatePicker';
import TimePicker from './pickers/TimePicker';
import PlatformSelector from './PlatformSelector';
import ImageUploader from './ImageUploader';
import ImageGenerator from './ImageGenerator';
import ImagePreview from './ImagePreview';
import { useModalContext } from '../../context/ModalContext';
import { usePostContext } from '../../context/PostContext';
import { formatPostDate } from '../../utils/dateUtils';
import type { PlatformType } from '../../types/platform';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const { setActiveModal } = useModalContext();
  const { addPost } = usePostContext();
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    platforms: [] as PlatformType[],
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const postDate = formatPostDate(formData.date, formData.time);
      
      if (formData.platforms.length === 0) {
        throw new Error('Please select at least one platform');
      }
      
      addPost({
        title: formData.title,
        description: formData.description,
        status: 'in-review',
        platform: formData.platforms[0],
        time: formData.time,
        day: postDate.getDate(),
        image: formData.image || undefined
      });

      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        platforms: [],
        image: '',
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setActiveModal('create-post');
    }
  }, [isOpen, setActiveModal]);

  const handleImageClick = () => {
    if (formData.image) {
      setShowImagePreview(true);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Schedule New Post">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter post title"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-blue focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter post description"
                className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-blue focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                value={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
              />
              <TimePicker
                value={formData.time}
                onChange={(time) => setFormData({ ...formData, time })}
              />
            </div>

            <PlatformSelector
              selected={formData.platforms}
              onChange={(platforms) => setFormData({ ...formData, platforms })}
            />

            <div className="space-y-4">
              {formData.image && (
                <div 
                  className="relative group cursor-pointer"
                  onClick={handleImageClick}
                >
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="text-white flex items-center gap-2">
                      <span>Click to enlarge</span>
                    </div>
                  </div>
                </div>
              )}
              
              <ImageUploader
                value={formData.image}
                onChange={(image) => setFormData({ ...formData, image })}
              />
              
              <ImageGenerator
                onGenerate={(image) => setFormData({ ...formData, image })}
                isGenerating={false}
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-vektrus-blue text-white rounded-lg hover:bg-vektrus-blue-dark transition-colors"
              >
                Schedule Post
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {showImagePreview && formData.image && (
        <ImagePreview
          src={formData.image}
          onClose={() => setShowImagePreview(false)}
        />
      )}
    </>
  );
}