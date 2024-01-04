import useClerkSWR from "@/lib/useClerkSWR";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { UserResource } from "@clerk/types";
import { useRef } from "react";
import TableSkeleton from "./TableSkeleton";

const convertClerkUserToTableData = (users: UserResource[]): User[] => {
  if (!users) return [];
  return users.map((user) => {
    return {
      id: user.id,
      name: `${user?.firstName} ${user?.lastName}`,
      role: user?.publicMetadata?.role as string,
      imageUrl: user?.imageUrl,
    };
  });
};

export default function Table() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useClerkSWR("/api/users");

  if (error) return null;

  if (!data || isLoading) return <TableSkeleton />;

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={convertClerkUserToTableData(data)}
        innerRef={tableContainerRef}
      />
    </div>
  );
}
