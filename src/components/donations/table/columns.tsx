import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DataTableColumnHeader } from "./column-header";

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
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="ID" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Date" />
    ),
  },
  {
    accessorKey: "donor",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Donor" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Amount" />
    ),
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
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Campaign" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Status" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column, table }) => (
      <DataTableColumnHeader
        column={column}
        table={table}
        title="Type of Donation"
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Email" />
    ),
  },
  {
    accessorKey: "nric",
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="NRIC" />
    ),
  },
  {
    accessorKey: "trainings",
    header: ({ column, table }) => (
      <DataTableColumnHeader
        column={column}
        table={table}
        title="Training programs"
      />
    ),
  },
];
