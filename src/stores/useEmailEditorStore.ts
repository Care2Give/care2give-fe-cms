import { create } from "zustand";

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

const useEmailEditorStore = create<EmailEditorState>()((set) => ({
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
  subjectContent: "<p>Thank you for donating to Caregivers Alliance!</p>",
  setSubjectContent: (subjectContent) => set({ subjectContent }),
  bodyContent: "<p>Warm Regards, Caregivers Alliance</p>",
  setBodyContent: (bodyContent) => set({ bodyContent }),
  didSaveContent: false,
  setDidSaveContent: (didSaveContent) => set({ didSaveContent }),
}));

export default useEmailEditorStore;
