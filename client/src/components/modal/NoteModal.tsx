import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2 } from 'lucide-react';
import { NoteModalProps } from '@/types/types';

const NoteModal: React.FC<NoteModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  onTitleChange, 
  onContentChange, 
  isEnhancing, 
  onEnhance, 
  onCancelEnhance, 
  enhancementPrompt, 
  onEnhancementPromptChange, 
  isLoading,
  onDelete
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; 
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <input
            className="font-semibold text-2xl w-full bg-transparent outline-none focus:border-b focus:border-blue-400 transition-all"
            value={title}
            onChange={onTitleChange}
            placeholder="Note Title"
          />
          <div className='flex gap-2'>
          <button
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={onDelete}
            disabled={isLoading}
          >
            <Trash2 size={16} />
          </button>

          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none p-2"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          </div>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-500">
              <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-4"></div>
              <p className="text-lg">Enhancing your note...</p>
            </div>
          ) : (
            <textarea
              className="w-full h-full min-h-80 p-4 border border-gray-200 rounded-md resize-none outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
              value={content}
              onChange={onContentChange}
              placeholder="Enter note content..."
            />
          )}
          
          {isEnhancing && (
            <div className="mt-6">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Enhancement Prompt
              </label>
              <input
                className="w-full p-3 border text-xs border-gray-200 rounded-md focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                value={enhancementPrompt}
                onChange={onEnhancementPromptChange}
                placeholder="Describe how you want to enhance this note..."
              />
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-100 flex justify-end items-center">
          <div className="flex gap-3">
            {isEnhancing  ? (
              <>
                <button
                  className="px-5 py-2.5 text-xs rounded-md bg-emerald-500 hover:bg-emerald-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  onClick={onEnhance}
                  disabled={isLoading}
                >
                  Apply Enhancement
                </button>
                <button
                  className="px-5 py-2.5 text-xs rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  onClick={onCancelEnhance}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </>
            ) : (
              content ?
              <button
                className="px-5 py-2.5 text-xs rounded-md bg-[#53418ddc] hover:bg-[#53418d] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                onClick={onEnhance}
                disabled={isLoading}
              >
                AI Enhance
              </button>:''
            )}
            <button
              className="px-5 py-2.5 rounded-md text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors font-medium"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body 
  );
};

export default NoteModal;