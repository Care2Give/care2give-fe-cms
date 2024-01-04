import { Button } from "@/components/ui/button";
import { CellContext } from "@tanstack/react-table";
import { User } from "./columns";
import { useAuth } from "@clerk/nextjs";
import { useSWRConfig } from "swr";
import { UserResource } from "@clerk/types";

export default function DeleteUserButton(props: CellContext<User, unknown>) {
  const { getToken } = useAuth();
  const { mutate } = useSWRConfig();

  async function deleteUser(id: string) {
    return fetch("/api/users", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: { Authorization: `Bearer ${await getToken()}` },
    }).then((res) => res.json());
  }

  return (
    <Button
      className="text-black bg-red-200 hover:bg-red-400"
      onClick={async () => {
        try {
          mutate("/api/users", deleteUser(props.row.original.id), {
            populateCache: (_, users) => {
              console.log("users", users);
              const filteredData = users?.filter(
                (user: UserResource) => user.id !== props.row.original.id
              );
              return [...filteredData] || [];
            },
          });
        } catch (e) {
          console.log(e);
        }
      }}
    >
      Remove
    </Button>
  );
}
