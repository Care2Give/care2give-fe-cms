import { useRouter } from "next/router";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Email } from "@/types/email-editor/Email";
import { ColumnDef } from "@tanstack/react-table";
import useEmailEditorStore from "@/stores/useEmailEditorStore";

export default function Table({
  emails,
  isCurrent = false,
}: {
  emails: Email[];
  isCurrent?: boolean;
}) {
  const router = useRouter();
  const { setIsEditing } = useEmailEditorStore();

  const handleEditCurrent = () => {
    router.push("/email-editor");
    setIsEditing(true);
  };

  const handleViewEmail = (id: string) => {
    router.push(`/email-editor/${id}`);
  };

  return (
    <div className="flex flex-col gap-8 m-4">
      <DataTable
        columns={
          columns(isCurrent, handleEditCurrent, handleViewEmail) as ColumnDef<
            Email,
            string
          >[]
        }
        data={emails}
      />
    </div>
  );
}
