import { createColumnHelper } from "@tanstack/react-table";
import RoleDropdown from "./RoleDropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type User = {
  id: number;
  name: string;
  role: string;
};

const columnHelper = createColumnHelper<User>();

export const columns = [
  columnHelper.accessor("name", {
    cell: (props) => props.getValue(),
    header: () => <span className="font-bold text-black">User</span>,
  }),
  columnHelper.accessor("role", {
    cell: (props) => <RoleDropdown {...props} />,
    header: () => (
      <div className="font-bold text-black flex items-center gap-2">
        <span>Role</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon height={16} width={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Role Tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <Button className="text-black bg-red-200 hover:bg-red-400">Remove</Button>
    ),
    header: () => (
      <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700">
        <PlusIcon />
        <span>Add New User</span>
      </Button>
    ),
  }),
];
