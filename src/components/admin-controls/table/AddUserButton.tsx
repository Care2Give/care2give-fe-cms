import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { useSWRConfig } from "swr";

// COMPONENT IS DEPRECATED

export default function AddUserButton() {
  const { getToken } = useAuth();
  const { mutate } = useSWRConfig();

  async function addUser(body: string) {
    return fetch("/api/users", {
      method: "POST",
      body,
      headers: { Authorization: `Bearer ${await getToken()}` },
    }).then((res) => res.json());
  }

  return (
    <Button
      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700"
      onClick={async () => {
        let i = 0;
        const roles = ["superuser", "donation-manager", "campaign-manager"];
        while (i < 50) {
          const body = {
            externalId: `user_${i}`,
            firstName: `Test ${i}`,
            lastName: `User ${i}`,
            emailAddress: [`test${i}@gmail.com`],
            password: "7h1s_1s_4_t3st",
            publicMetadata: { role: roles[i % 3] },
          };
          try {
            mutate("/api/users", addUser(JSON.stringify(body)));
          } catch (err) {
            console.log(err);
          }
          i++;
        }
      }}
    >
      <PlusIcon />
      <span>Add New User</span>
    </Button>
  );
}
