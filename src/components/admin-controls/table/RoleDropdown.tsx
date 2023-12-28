import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CellContext } from "@tanstack/react-table";
import { User } from "./columns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export default function RoleDropdown(props: CellContext<User, string>) {
  const [currentRole, setCurrentRole] = useState(props.getValue());
  const handleRoleChange = (role: string) => {
    // console.log(e.target);
    setCurrentRole(role);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="shadow-lg flex items-center justify-between px-3 py-2 w-56 rounded bg-[#FFEFE0]">
        <span>{currentRole}</span>
        <ChevronDownIcon stroke="gray" height={16} width={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleRoleChange("Superuser")}>
          Superuser
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange("Donation Manager")}>
          Donation Manager
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange("Campaign Manager")}>
          Campaign Manager
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange(props.getValue())}>
          {props.getValue()}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
