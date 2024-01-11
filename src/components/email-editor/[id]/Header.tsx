import { ArrowLeft, Bell } from "lucide-react";
import { arabotoBold } from "@/lib/font";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center w-full">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft />
      </Button>

      <div className="flex items-center gap-2">
        <p className={`${arabotoBold.className} text-gray-400 mr-2`}>
          View Past Email
        </p>
        <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
          <Bell />
        </div>
      </div>
    </div>
  );
}
