import React from 'react';
import { X } from 'lucide-react';
import { useModalContext } from '../../context/ModalContext';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const { isPickerActive } = useModalContext();
  const modalRef = useClickOutside<HTMLDivElement>(() => {
    if (!isPickerActive) {
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-[10vh]">
      <div
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-xl max-h-[80vh] flex flex-col animate-fade-in shadow-2xl"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-vektrus-gray-dark">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}