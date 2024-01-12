import { Email } from "@/types/email-editor/Email";
import Table from "./table";

export default function PreviousTemplates({ emails }: { emails: Email[] }) {
  return (
    <div>
      <h2 className="text-xl">Previous Templates:</h2>
      <Table emails={emails} />
    </div>
  );
}
