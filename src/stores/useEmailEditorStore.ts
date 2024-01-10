import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface EmailEditorState {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const useEmailEditorStore = create<EmailEditorState>()(
  devtools(
    (set) => ({
      isEditing: false,
      setIsEditing: (isEditing) => set({ isEditing }),
    }),
    { name: "EmailEditorStore" }
  )
);

export default useEmailEditorStore;
