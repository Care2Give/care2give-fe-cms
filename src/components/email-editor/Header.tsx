import { Bell } from "lucide-react";
import localFont from "next/font/local";

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

export default function Header() {
  return (
    <div className="flex justify-end items-center w-full">
      <p className={`${arabotoBold.className} text-gray-400`}>Email Template</p>
      <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
        <Bell />
      </div>
    </div>
  );
}
