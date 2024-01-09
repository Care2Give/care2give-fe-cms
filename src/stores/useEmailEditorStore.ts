import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface EmailEditorState {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  subjectContent: string;
  setSubjectContent: (subjectContent: string) => void;
  bodyContent: string;
  setBodyContent: (bodyContent: string) => void;
  didSaveContent: boolean;
  setDidSaveContent: (didSaveContent: boolean) => void;
}

const useEmailEditorStore = create<EmailEditorState>()(
  devtools(
    (set) => ({
      isEditing: false,
      setIsEditing: (isEditing) => set({ isEditing }),
      subjectContent: "",
      setSubjectContent: (subjectContent) => set({ subjectContent }),
      bodyContent: "",
      setBodyContent: (bodyContent) => set({ bodyContent }),
      didSaveContent: false,
      setDidSaveContent: (didSaveContent) => set({ didSaveContent }),
    }),
    { name: "EmailEditorStore" }
  )
);

export default useEmailEditorStore;
