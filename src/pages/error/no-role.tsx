import { UserButton } from "@clerk/nextjs";

// TODO: Styling and design needed
export default function NoRole() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-white rounded w-3/4 flex items-center flex-col p-8 shadow">
        <h1 className="text-red-500 text-4xl font-bold">401</h1>
        <h2 className="text-red-500 text-xl font-bold">Unauthorized</h2>
        <p className="font-semibold text-center py-4">
          Please contact the admin to give you a role before you can access the
          system. Please sign out below.
        </p>
        <UserButton
          afterSignOutUrl="/login"
          appearance={{
            elements: {
              userButtonAvatarBox: "h-16 w-16",
            },
          }}
        />
      </div>
    </div>
  );
}
