import { Bell } from "lucide-react";
import localFont from "next/font/local";

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

type HeaderProps = {
  isExportData?: boolean;
};

export default function Header({ isExportData = false }: HeaderProps) {
  return (
    <div className="flex justify-end items-center w-full">
      <p className={`${arabotoBold.className} text-gray-400`}>
        {isExportData ? "Data Selection" : "Donation Manager"}
      </p>
      <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
        <Bell />
      </div>
    </div>
  );
}
