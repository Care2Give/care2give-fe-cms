import { createColumnHelper } from "@tanstack/react-table";
import RoleDropdown from "./RoleDropdown";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleTooltip from "./RoleTooltip";
import DeleteUserButton from "./DeleteUserButton";
import AddUserButton from "./AddUserButton";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type User = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
};

const columnHelper = createColumnHelper<User>();
export const columns = [
  columnHelper.accessor("name", {
    cell: (props) => (
      <p className="flex items-center gap-2">
        <Image
          src={props.row.original.imageUrl}
          alt={props.getValue()}
          height={32}
          width={32}
          className="rounded-full"
        />
        <span>{props.getValue()}</span>
      </p>
    ),
    header: () => <span className="font-bold text-black">User</span>,
  }),
  columnHelper.accessor("role", {
    cell: (props) => <RoleDropdown {...props} />,
    header: () => <RoleTooltip />,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <DeleteUserButton {...props} />,
    header: () => <AddUserButton />,
  }),
];
