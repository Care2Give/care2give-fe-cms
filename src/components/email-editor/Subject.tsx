import useEmailEditorStore from "@/stores/useEmailEditorStore";
import { EditorContent, Editor } from "@tiptap/react";
import { useEffect } from "react";

type SubjectProps = {
  editor: Editor | null;
  subject: string;
};

const Subject = ({ editor, subject }: SubjectProps) => {
  const { isEditing } = useEmailEditorStore();

  useEffect(() => {
    if (editor) {
      if (isEditing) {
        editor.setOptions({ editable: true });
      } else {
        editor.setOptions({ editable: false });
      }
    }
  }, [editor, isEditing]);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(subject);
    }
  }, [editor]);

  return (
    <div className="flex flex-col gap-2">
      <p>Subject:</p>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Subject;
