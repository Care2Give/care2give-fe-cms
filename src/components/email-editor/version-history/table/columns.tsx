import { createColumnHelper } from "@tanstack/react-table";
import { arabotoBold } from "@/lib/font";
import { getFormattedDateTime } from "@/lib/utils";
import { Email } from "@/types/email-editor/Email";
import { Button } from "@/components/ui/button";

const columnHelper = createColumnHelper<Email>();

export const columns = (
  isCurrent: boolean,
  handleEditCurrent: () => void,
  handleViewEmail: (id: string) => void
) => [
  columnHelper.accessor("version", {
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
    header: () => (
      <p className={`${arabotoBold.className} text-black text-center`}>
        Number
      </p>
    ),
  }),
  columnHelper.accessor("updatedAt", {
    cell: (props) => (
      <p className="flex items-center gap-2 justify-center">
        {getFormattedDateTime(props.getValue())}
      </p>
    ),
    header: () => (
      <p className={`${arabotoBold.className} text-black text-center`}>
        Date & Time
      </p>
    ),
  }),
  columnHelper.accessor("firstName", {
    cell: (props) => (
      <p className="flex items-center gap-2 justify-center">
        {props.getValue()}
      </p>
    ),
    header: () => (
      <p className={`${arabotoBold.className} text-black text-center`}>
        Edited By
      </p>
    ),
  }),
  columnHelper.display({
    id: "action",
    cell: (props) => (
      <Button
        className="flex justify-center cursor-pointer underline font-bold w-full"
        variant="ghost"
        onClick={() => {
          if (isCurrent) {
            handleEditCurrent();
          } else {
            handleViewEmail(props.row.original.id);
          }
        }}
      >
        {isCurrent ? "Edit" : "View"}
      </Button>
    ),
    header: () => (
      <p className={`${arabotoBold.className} text-black text-center`}>
        Action
      </p>
    ),
  }),
];
