import { Bell } from "lucide-react";
import { arabotoBold } from "@/lib/font";

type HeaderProps = {
  isExportData?: boolean;
};

export default function Header({ isExportData = false }: HeaderProps) {
  return (
    <div className="flex justify-end items-center w-full">
      <p className={`${arabotoBold.className} text-gray-400 mr-2`}>
        {isExportData ? "Data Selection" : "Donation Manager"}
      </p>
      <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
        <Bell />
      </div>
    </div>
  );
}
