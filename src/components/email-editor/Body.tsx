import useEmailEditorStore from "@/stores/useEmailEditorStore";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const Body = () => {
  const { isEditing, didSaveContent, bodyContent, setBodyContent } =
    useEmailEditorStore();

  const editor = useEditor({
    extensions: [StarterKit],
    content: bodyContent,
    editorProps: {
      attributes: {
        class: "p-3 border-gray-300 border-2 border-solid rounded text-sm",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      if (isEditing) {
        editor.setOptions({ editable: true });
      } else {
        editor.setOptions({ editable: false });
      }

      if (!isEditing && didSaveContent) {
        setBodyContent(editor.getHTML());
      }
    }
  }, [editor, isEditing, didSaveContent]);

  return (
    <div className="flex flex-col gap-2">
      <p>Body:</p>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Body;
