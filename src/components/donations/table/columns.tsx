import { createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./column-header";
import { DonationTable } from "@/types/donations/DonationTable";
import { capitalizeFirstLetter, getFormattedDateTime } from "@/lib/utils";
import { DonationType } from "@/types/prismaSchema";
import Nric from "./Nric";

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

const columnHelper = createColumnHelper<DonationTable>();

export const columns = [
  columnHelper.accessor("id", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="ID" />
    ),
  }),
  columnHelper.accessor("createdAt", {
    cell: (props) => <p>{getFormattedDateTime(props.getValue())}</p>,
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Date" />
    ),
  }),
  columnHelper.accessor("donorFirstName", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Donor" />
    ),
  }),
  columnHelper.accessor("dollars", {
    cell: ({ row }) => {
      const { dollars, cents } = row.original;
      const amount = dollars + cents / 100;
      const formatted = new Intl.NumberFormat("en-SG", {
        style: "currency",
        currency: "SGD",
      }).format(amount);

      return formatted;
    },
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Amount" />
    ),
  }),
  columnHelper.accessor("campaign.title", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Campaign" />
    ),
  }),

  columnHelper.accessor("campaign.status", {
    cell: (props) => <p>{capitalizeFirstLetter(props.getValue())}</p>,
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Status" />
    ),
  }),
  columnHelper.accessor("donationType", {
    cell: (props) => {
      const val = props.getValue();
      if (val === DonationType.INDIVIDUAL_WITH_TAX_DEDUCTION) {
        return "Individual";
      } else if (val === DonationType.ANONYMOUS) {
        return "Anonymous";
      } else if (val === DonationType.WITHOUT_TAX_DEDUCTION) {
        return "Individual w/o Tax Deduction";
      } else if (val === DonationType.GROUP_WITH_TAX_DEDUCTION) {
        return "Group";
      }
    },
    header: ({ column, table }) => (
      <DataTableColumnHeader
        column={column}
        table={table}
        title="Type of Donation"
      />
    ),
  }),
  columnHelper.accessor("donorEmail", {
    cell: (props) => props.getValue(),
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="Email" />
    ),
  }),
  columnHelper.accessor("nric", {
    cell: (props) => <Nric nric={props.getValue()} />,
    header: ({ column, table }) => (
      <DataTableColumnHeader column={column} table={table} title="NRIC" />
    ),
  }),

  columnHelper.accessor("donorTrainingPrograms", {
    cell: (props) => props.getValue()?.join(", "),
    header: ({ column, table }) => (
      <DataTableColumnHeader
        column={column}
        table={table}
        title="Training programs"
      />
    ),
  }),
];
