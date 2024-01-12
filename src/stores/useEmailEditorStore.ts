import { Email } from "@/types/email-editor/Email";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface EmailEditorState {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  emails: Email[];
  setEmails: (emails: Email[]) => void;
}

const useEmailEditorStore = create<EmailEditorState>()(
  devtools(
    (set) => ({
      isEditing: false,
      setIsEditing: (isEditing) => set({ isEditing }),
      emails: [],
      setEmails: (emails) => set({ emails }),
    }),
    { name: "EmailEditorStore" }
  )
);

export default useEmailEditorStore;
