import React from 'react';
import { LayoutDashboard, HelpCircle, FileText, Plus } from 'lucide-react';
import Statistics from './Statistics';
import { useCreatePostModal } from '../../hooks/useCreatePostModal';
import CreatePostModal from '../modal/CreatePostModal';

export default function Sidebar() {
  const { isOpen, openModal, closeModal } = useCreatePostModal();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-vektrus-blue rounded-lg flex items-center justify-center">
            <div className="text-white font-bold">V</div>
          </div>
          <span className="font-semibold text-vektrus-gray-dark">Vektrus</span>
        </div>

        <nav className="space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-vektrus-gray-light hover:text-vektrus-gray-dark hover-transition">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <Statistics />
      </div>

      <div className="p-4 space-y-1">
        <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-vektrus-gray-light hover:text-vektrus-gray-dark hover-transition">
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-vektrus-gray-light hover:text-vektrus-gray-dark hover-transition">
          <FileText className="w-5 h-5" />
          <span>Documentation</span>
        </a>
        <button
          onClick={openModal}
          className="w-full mt-4 flex items-center justify-center space-x-2 bg-vektrus-blue text-white px-4 py-2 rounded-lg hover:bg-vektrus-blue-dark hover-transition"
        >
          <Plus className="w-5 h-5" />
          <span>Create Post</span>
        </button>
      </div>

      {isOpen && <CreatePostModal isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
}