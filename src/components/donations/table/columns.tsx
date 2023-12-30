import { createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./column-header";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Donation = {
  id: number | string;
  date: string;
  donor: string;
  amount: number | string;
  campaign: string;
  status: string;
  type: string;
  email: string;
  nric?: string | null;
  trainings?: string | null;
};

const columnHelper = createColumnHelper<Donation>();

export const columns = [
  columnHelper.accessor("id", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="ID" />
    ),
  }),
  columnHelper.accessor("date", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Date" />
    ),
  }),
  columnHelper.accessor("donor", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Donor" />
    ),
  }),
  columnHelper.accessor("amount", {
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-SG", {
        style: "currency",
        currency: "SGD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Amount" />
    ),
  }),
  columnHelper.accessor("campaign", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Campaign" />
    ),
  }),

  columnHelper.accessor("status", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Status" />
    ),
  }),
  columnHelper.accessor("type", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader
        column={column}
        table={table}
        title="Type of Donation"
      />
    ),
  }),
  columnHelper.accessor("email", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Email" />
    ),
  }),
  columnHelper.accessor("nric", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="NRIC" />
    ),
  }),

  columnHelper.accessor("trainings", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader
        column={column}
        table={table}
        title="Training programs"
      />
    ),
  }),
];
