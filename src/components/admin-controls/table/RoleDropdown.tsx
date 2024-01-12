import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CellContext } from "@tanstack/react-table";
import { User } from "./columns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function RoleDropdown(props: CellContext<User, string>) {
  const [currentRole, setCurrentRole] = useState(props.getValue());

  const handleRoleChange = async (role: string) => {
    const body = {
      id: props.row.original.id,
      role: role,
    };
    await fetch("/api/users", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    setCurrentRole(role);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="shadow-lg flex items-center justify-between px-3 py-2 w-56 rounded bg-[#FFEFE0]">
        <span>
          {capitalizeFirstLetter(
            ((currentRole as string) || "No Role").replace("-", " ")
          )}
        </span>
        <ChevronDownIcon stroke="gray" height={16} width={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-lg w-56 text-gray-700">
        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleRoleChange("superuser")}
          className="cursor-pointer"
        >
          Superuser
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleRoleChange("donation-manager")}
          className="cursor-pointer"
        >
          Donation Manager
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleRoleChange("campaign-manager")}
          className="cursor-pointer"
        >
          Campaign Manager
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
