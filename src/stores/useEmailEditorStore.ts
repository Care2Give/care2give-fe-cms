import { SelectSingleEventHandler } from "react-day-picker";
import { create } from "zustand";

interface EmailEditorState {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const useEmailEditorStore = create<EmailEditorState>()((set) => ({
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
}));

export default useEmailEditorStore;
