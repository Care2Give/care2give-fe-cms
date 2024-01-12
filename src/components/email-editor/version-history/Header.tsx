import { ArrowLeft, Bell } from "lucide-react";
import { arabotoBold } from "@/lib/font";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import useEmailEditorStore from "@/stores/useEmailEditorStore";

export default function Header() {
  const { setIsEditing } = useEmailEditorStore();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center w-full">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          router.replace("/email-editor");
          setIsEditing(false);
        }}
      >
        <ArrowLeft />
      </Button>
      <div className="flex items-center gap-2">
        <p className={`${arabotoBold.className} text-gray-400 mr-2`}>
          Version History
        </p>
        <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
          <Bell />
        </div>
      </div>
    </div>
  );
}
