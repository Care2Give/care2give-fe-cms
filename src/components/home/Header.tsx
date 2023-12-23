import { Bell } from "lucide-react";
import localFont from "next/font/local";

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <p className={`${arabotoBold.className} text-2xl`}>Hello Song Jie,</p>
      <div className="flex justify-center items-center gap-2">
        <p className={`${arabotoBold.className} text-gray-400`}>Home</p>
        <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
          <Bell />
        </div>
      </div>
    </div>
  );
}
