
export interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isEnhancing: boolean;
  onEnhance: () => void;
  onCancelEnhance: () => void;
  enhancementPrompt: string;
  onEnhancementPromptChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  onDelete: () => void;
}

interface NoteData {
  title: string;
  content: string;
  updateNote: (title: string, content: string) => void;
  onDelete?: (id: string) => void;
}

export interface NoteNodeProps {
  data: NoteData;
  id: string;
}


