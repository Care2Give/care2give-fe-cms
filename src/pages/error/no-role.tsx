import { UserButton } from "@clerk/nextjs";

// TODO: Styling and design needed
export default function NoRole() {
  return (
    <div>
      <h1>401</h1>
      <h2>Unauthorized</h2>
      <p>
        Please contact the admin to give you a role before you can access the
        system.
      </p>
      <UserButton />
    </div>
  );
}
