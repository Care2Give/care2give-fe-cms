import { createColumnHelper } from "@tanstack/react-table";
import { arabotoBold } from "@/lib/font";
import { capitalizeFirstLetter } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import data from "./MOCK_DATA";
import useCampaignEditorStore, {CampaignImage} from "@/stores/useCampaignEditorStore";
import {DonationOption} from "@/components/campaigns/edit/DonationOptionForm";

export type Campaign = {
  id: number;
  title: string;
  lastEditBy: string;
  isActive: boolean;
  startDate: string; // Date type not allowed for Tanstack table accessor
  endDate: string;
  description: string;
  targetAmount: number;
  donationOptions: DonationOption[];
  images: CampaignImage[];
};

const columnHelper = createColumnHelper<Campaign>();

export const getColumns = (onEdit) => [
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
        Last edited by
      </p>
    ),
  }),
  columnHelper.accessor("isActive", {
    cell: (props) => (
      <div
        className={`${
          props.getValue() ? "bg-green-200" : "bg-red-200"
        } text-center py-2 px-4 rounded-2xl`}
      >
        {props.getValue() ? "Active" : "Inactive"}
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
    cell: (cell) => (
      <EditIcon onClick={() => onEdit(cell.row.index)} className="hover:cursor-pointer hover:stroke-[#3872FC]" />
    ),
  }),
];
