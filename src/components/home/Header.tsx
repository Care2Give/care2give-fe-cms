import { Bell } from "lucide-react";
import { arabotoBold } from "@/lib/font";

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <p className={`${arabotoBold.className} text-2xl`}>Hello Song Jie,</p>
      <div className="flex justify-center items-center gap-2">
        <p className={`${arabotoBold.className} text-gray-400 mr-2`}>Home</p>
        <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
          <Bell />
        </div>
      </div>
    </div>
  );
}
