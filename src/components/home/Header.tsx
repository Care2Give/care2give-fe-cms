import { Bell } from "lucide-react";
import { arabotoBold } from "@/lib/font";
import { useUser } from "@clerk/nextjs";

export default function Header() {
  const data = useUser();
  const { firstName } = data.user as { firstName: string };

  return (
    <div className="flex justify-between items-center">
      <p className={`${arabotoBold.className} text-2xl`}>
        Hello {firstName || "user"},
      </p>
      <div className="flex justify-center items-center gap-2">
        <p className={`${arabotoBold.className} text-gray-400 mr-2`}>Home</p>
        <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
          <Bell />
        </div>
      </div>
    </div>
  );
}
