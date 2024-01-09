import useEmailEditorStore from "@/stores/useEmailEditorStore";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import MenuBar from "./MenuBar";

const Body = () => {
  const { isEditing, didSaveContent, bodyContent, setBodyContent } =
    useEmailEditorStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        protocols: ["http", "https"],
        autolink: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, isEditing, didSaveContent]);

  return (
    <div className="flex flex-col gap-2">
      <p>Body:</p>
      {isEditing && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
};

export default Body;
