import { createColumnHelper } from "@tanstack/react-table";
import { arabotoBold } from "@/lib/font";
import { capitalizeFirstLetter } from "@/lib/utils";
import { EditIcon } from "lucide-react";

export type Campaign = {
  id: number;
  title: string;
  lastEditBy: string;
  status: string; // can narrow
  startDate: string; // Date type not allowed for Tanstack table accessor
  endDate: string;
};

const columnHelper = createColumnHelper<Campaign>();

export const columns = [
  columnHelper.accessor("title", {
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
    header: () => (
      <p
        className={`${arabotoBold.className} text-black text-center text-[18px] pt-2`}
      >
        Title
      </p>
    ),
  }),
  columnHelper.accessor("lastEditBy", {
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
    header: () => (
      <p
        className={`${arabotoBold.className} text-black text-center text-[18px] pt-2`}
      >
        Last edit
      </p>
    ),
  }),
  columnHelper.accessor("status", {
    cell: (props) => (
      <div
        className={`${
          props.getValue() === "active" ? "bg-green-200" : "bg-red-200"
        } text-center py-2 px-4 rounded-2xl`}
      >
        {capitalizeFirstLetter(props.getValue())}
      </div>
    ),
    header: () => (
      <p
        className={`${arabotoBold.className} text-black text-center text-[18px] pt-2`}
      >
        Status
      </p>
    ),
  }),
  columnHelper.accessor("startDate", {
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
    header: () => (
      <p
        className={`${arabotoBold.className} text-black text-center text-[18px] pt-2`}
      >
        Start Date
      </p>
    ),
  }),
  columnHelper.accessor("endDate", {
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
    header: () => (
      <p
        className={`${arabotoBold.className} text-black text-center text-[18px] pt-2`}
      >
        End Date
      </p>
    ),
  }),
  columnHelper.display({
    id: "edit",
    cell: () => <EditIcon />,
  }),
];
