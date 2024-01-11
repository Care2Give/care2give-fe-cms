import { Email } from "@/types/email-editor/Email";
import Table from "./table";

export default function CurrentTemplate({ email }: { email: Email[] }) {
  return (
    <div>
      <h2 className="text-xl">Current Template:</h2>
      <Table emails={email} isCurrent />
    </div>
  );
}
