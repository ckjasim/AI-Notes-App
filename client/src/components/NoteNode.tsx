import { enhanceApi, deleteNoteApi } from '@/services/api/notesApi';
import { useState, useEffect, useRef } from 'react';
import { showToast } from '@/util/toast/Toast';
import NoteModal from './modal/NoteModal';
import { NoteNodeProps } from '@/types/types';

const NoteNode: React.FC<NoteNodeProps> = ({ data, id }) => {
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [enhancementPrompt, setEnhancementPrompt] = useState<string>('');
  const [localTitle, setLocalTitle] = useState<string>(data.title || '');
  const [localContent, setLocalContent] = useState<string>(data.content || '');
  const [loadingPrompt, setLoadingPrompt] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalTitle(data.title || '');
    setLocalContent(data.content || '');
  }, [data.title, data.content]);

  const handleChange = (title: string, content: string) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      data.updateNote(title, content);
    }, 500);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    handleChange(newTitle, localContent);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    handleChange(localTitle, newContent);
  };

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const handleAIEnhance = async () => {
    if (!isEnhancing) {
      setIsEnhancing(true);
      return;
    }

    setLoadingPrompt(true);
    try {
      const response = await enhanceApi(enhancementPrompt, localContent);
      const enhancedContent = response.data.choices[0].message.content;
      setLocalContent(enhancedContent);
      handleChange(localTitle, enhancedContent);
    } catch (error) {
      console.error('Enhancement failed:', error);
      showToast.error('Failed to enhance note. Please try again.');
    } finally {
      setLoadingPrompt(false);
      setIsEnhancing(false);
      setEnhancementPrompt('');
    }
  };

  const handleDeleteNote = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteNoteApi(id);
      if (response.success) {
        showToast.success('Note deleted successfully');
        setIsModalOpen(false);
        // Call the onDelete function passed from the parent component
        if (data.onDelete) {
          data.onDelete();
        }
      } else {
        showToast.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      showToast.error('An error occurred while deleting the note');
    } finally {
      setIsDeleting(false);
    }
  };

  const openModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLButtonElement
    ) {
      return;
    }
    setIsModalOpen(true);
    if (isEnhancing && !loadingPrompt) {
      setIsEnhancing(false);
    }
  };

  return (
    <>
      <div
        className="p-4 rounded-xl bg-white border border-gray-100 shadow-lg w-72 cursor-pointer hover:shadow-xl"
        onClick={openModal}
        style={{
          background: "linear-gradient(to bottom, #ffffff, #f9f9ff)",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
          <input
            className="font-bold text-lg w-full bg-transparent outline-none cursor-text text-gray-800"
            value={localTitle}
            onChange={handleTitleChange}
            placeholder="Note Title"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>

        <div className="w-full min-h-28 p-2 max-h-36 overflow-hidden rounded-md bg-indigo-50 mb-2">
          {loadingPrompt ? (
            <div className="flex justify-center items-center h-28">
              <div className="w-8 h-8 border-3 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="line-clamp-4 text-gray-600 font-light leading-relaxed">
              {localContent || 'Enter note content...'}
            </div>
          )}
        </div>
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={localTitle}
        content={localContent}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
        isEnhancing={isEnhancing}
        onEnhance={handleAIEnhance}
        onCancelEnhance={() => setIsEnhancing(false)}
        enhancementPrompt={enhancementPrompt}
        onEnhancementPromptChange={(e) => setEnhancementPrompt(e.target.value)}
        isLoading={loadingPrompt || isDeleting}
        onDelete={handleDeleteNote}
      />
    </>
  );
};

export default NoteNode;