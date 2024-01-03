import { Bell } from "lucide-react";
import { arabotoBold } from "@/lib/font";

export default function Header() {
  return (
    <div className="flex justify-end items-center w-full">
      <p className={`${arabotoBold.className} text-gray-400 mr-2`}>
        Campaigns - Archive
      </p>
      <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
        <Bell />
      </div>
    </div>
  );
}
