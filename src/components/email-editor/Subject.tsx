import useEmailEditorStore from "@/stores/useEmailEditorStore";
import { EditorContent, Editor } from "@tiptap/react";
import { useEffect } from "react";

type SubjectProps = {
  editor: Editor | null;
  subject: string;
};

const Subject = ({ editor, subject }: SubjectProps) => {
  const { isEditing, didSaveContent } = useEmailEditorStore();

  useEffect(() => {
    if (editor) {
      if (isEditing) {
        editor.setOptions({ editable: true });
      } else {
        editor.setOptions({ editable: false });
      }

      // if (!isEditing && didSaveContent) {
      //   setSubjectContent(editor.getHTML());
      // }
      // if (!isEditing && !didSaveContent) {
      //   editor.commands.setContent(subjectContent);
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, isEditing, didSaveContent]);
  useEffect(() => {
    console.log("subject", subject);
    if (editor) {
      editor.commands.setContent(subject);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <p>Subject:</p>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Subject;
