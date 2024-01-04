import useClerkSWR from "@/lib/useClerkSWR";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { UserResource } from "@clerk/types";

const convertClerkUserToTableData = (users: UserResource[]): User[] => {
  if (!users) return [];
  return users.map((user) => {
    return {
      id: user.id,
      name: `${user?.firstName} ${user?.lastName}`,
      role: user?.publicMetadata?.role as string,
    };
  });
};

export default function Table() {
  const { data, error } = useClerkSWR("/api/users");

  if (!data || error) return null;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={convertClerkUserToTableData(data)} />
    </div>
  );
}
