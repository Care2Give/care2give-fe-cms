import useEmailEditorStore from "@/stores/useEmailEditorStore";
import { EditorContent, Editor } from "@tiptap/react";
import { useEffect } from "react";
import MenuBar from "./MenuBar";

type BodyProps = {
  editor: Editor | null;
  body: string;
};

const Body = ({ editor, body }: BodyProps) => {
  const { isEditing, didSaveContent } = useEmailEditorStore();

  useEffect(() => {
    if (editor) {
      if (isEditing) {
        editor.setOptions({ editable: true });
      } else {
        editor.setOptions({ editable: false });
      }

      // if (!isEditing && didSaveContent) {
      //   setBodyContent(editor.getHTML());
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, isEditing, didSaveContent]);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(body);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <p>Body:</p>
      {isEditing && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Body;
