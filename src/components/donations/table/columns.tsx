import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Donation = {
  id: number;
  date: string;
  donor: string;
  amount: number;
  campaign: string;
  status: string;
  type: string;
  email: string;
  nric?: string | null;
  trainings?: string | null;
};

export const columns: ColumnDef<Donation>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "donor",
    header: "Donor",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-SG", {
        style: "currency",
        currency: "SGD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "campaign",
    header: "Campaign",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "type",
    header: "Type of Donation",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nric",
    header: "NRIC",
  },
  {
    accessorKey: "trainings",
    header: "Training Programs",
  },
];
