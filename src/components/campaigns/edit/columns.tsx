import { createColumnHelper } from "@tanstack/react-table";
import { arabotoBold } from "@/lib/font";
import { EditIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@radix-ui/react-popover";
import { DonationAmountFormInput } from "@/stores/useCampaignEditorStore";

const columnHelper = createColumnHelper<DonationAmountFormInput>();

export const columns = (
  onEdit: (index: number) => void,
  onDelete: (index: number) => void
) => [
  columnHelper.accessor("amount", {
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-SG", {
        style: "currency",
        currency: "SGD",
      }).format(row.original.amount);

      return <p className="text-center">{formatted}</p>;
    },
    header: () => (
      <p
        className={`${arabotoBold.className} text-black text-center text-[18px] pt-2`}
      >
        Amount
      </p>
    ),
  }),
  columnHelper.accessor("description", {
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
    header: () => (
      <p
        className={`${arabotoBold.className} text-black text-center text-[18px] pt-2`}
      >
        Description
      </p>
    ),
  }),
  columnHelper.display({
    id: "edit",
    cell: ({ cell }) => (
      <Button variant="ghost" className="float-right p-0">
        <EditIcon onClick={() => onEdit(cell.row.index)} />
      </Button>
    ),
  }),
  columnHelper.display({
    id: "delete",
    cell: ({ cell }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="p-0">
            <Trash2 />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-white rounded p-4 flex flex-col gap-2">
          <div>Are you sure you want to delete this option?</div>
          <div className="flex justify-end">
            <PopoverClose>
              <Button variant="ghost">Cancel</Button>
            </PopoverClose>
            <PopoverClose>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => onDelete(cell.row.index)}
              >
                Confirm
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    ),
  }),
];
