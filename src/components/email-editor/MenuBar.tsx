import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import EditUrlDialog from "./EditUrlDialog";

type MenuBarProps = {
  editor: Editor | null;
};

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        value="bold"
        aria-label="Toggle bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "bg-white text-black border rounded border-gray-200 hover:bg-gray-100 hover:text-black",
          {
            "bg-gray-200": editor.isActive("bold"),
          }
        )}
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      <Button
        value="italic"
        aria-label="Toggle italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "bg-white text-black border rounded border-gray-200 hover:bg-gray-100 hover:text-black",
          {
            "bg-gray-200": editor.isActive("italic"),
          }
        )}
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      <Button
        value="underline"
        aria-label="Toggle underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(
          "bg-white text-black border rounded border-gray-200 hover:bg-gray-100 hover:text-black",
          {
            "bg-gray-200": editor.isActive("underline"),
          }
        )}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        value="strikethrough"
        aria-label="Toggle strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(
          "bg-white text-black border rounded border-gray-200 hover:bg-gray-100 hover:text-black",
          {
            "bg-gray-200": editor.isActive("strike"),
          }
        )}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-white text-black border rounded border-gray-200 hover:bg-gray-100 hover:text-black">
            {editor.isActive({ textAlign: "left" }) ? (
              <AlignLeftIcon className="h-4 w-4" />
            ) : editor.isActive({ textAlign: "center" }) ? (
              <AlignCenterIcon className="h-4 w-4" />
            ) : (
              <AlignRightIcon className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex gap-2">
          <Button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="bg-white text-black border rounded border-gray-200 hover:bg-gray-100 hover:text-black"
          >
            <AlignLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="bg-white text-black border rounded border-gray-200 hover:bg-gray-100 hover:text-black"
          >
            <AlignCenterIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className="bg-white text-black border rounded border-gray-200 hover:bg-gray-100 hover:text-black"
          >
            <AlignRightIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="color"
        className=""
        onInput={(event) =>
          editor
            .chain()
            .focus()
            .setColor((event.target as HTMLInputElement).value)
            .run()
        }
        value={editor.getAttributes("textStyle").color}
      />

      <EditUrlDialog editor={editor} />
    </div>
  );
};

export default MenuBar;
