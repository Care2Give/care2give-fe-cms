import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { LinkIcon } from "lucide-react";

type EditUrlDialogProps = {
  editor: Editor | null;
};

export default function EditUrlDialog({ editor }: EditUrlDialogProps) {
  const [curUrl, setCurUrl] = useState<string>(
    editor?.getAttributes("link").href || ""
  );

  const handleSetLink = () => {
    if (editor) {
      if (curUrl === null) {
        return;
      }
      if (curUrl === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: curUrl })
        .run();
    }
    setCurUrl("");
  };

  if (!editor) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "bg-white text-black border rounded border-gray-200 hover:bg-gray-100 hover:text-black",
            {
              "bg-gray-200": editor.isActive("link"),
            }
          )}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Label htmlFor="link" className="text-right">
            Link
          </Label>
          <Input
            id="link"
            value={curUrl}
            onChange={(e) => setCurUrl(e.target.value)}
            className="col-span-3"
            placeholder="Enter link"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSetLink}>
              Set URL
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
