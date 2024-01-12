import { createColumnHelper } from "@tanstack/react-table";
import { arabotoBold } from "@/lib/font";
import { capitalizeFirstLetter, dateOptions } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { CampaignTable } from "@/types/campaigns/CampaignTable";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const columnHelper = createColumnHelper<CampaignTable>();

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
  columnHelper.accessor("editedBy", {
    cell: (props) => (
      <p className="flex items-center gap-2 justify-center">
        <Image
          src={props.row.original.userImageUrl || "/logo.png"}
          alt={props.getValue()}
          height={32}
          width={32}
          className="rounded-full"
        />
        <span>{props.row.original.firstName || "NO NAME"}</span>
      </p>
    ),
    header: () => (
      <p
        className={`${arabotoBold.className} text-black text-center text-[18px] pt-2`}
      >
        Last edited by
      </p>
    ),
  }),
  columnHelper.accessor("status", {
    cell: (props) => (
      <div
        className={`${
          props.getValue() === "ACTIVE" ? "bg-green-200" : "bg-red-200"
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
    cell: (props) => (
      <p className="text-center">
        {new Date(props.getValue()).toLocaleDateString("en-SG", dateOptions)}
      </p>
    ),
    header: () => (
      <p
        className={`${arabotoBold.className} text-black text-center text-[18px] pt-2`}
      >
        Start Date
      </p>
    ),
  }),
  columnHelper.accessor("endDate", {
    cell: (props) => (
      <p className="text-center">
        {new Date(props.getValue()).toLocaleDateString("en-SG")}
      </p>
    ),
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
    cell: () => (
      <Button variant="ghost">
        <EditIcon />
      </Button>
    ),
  }),
];
