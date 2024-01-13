import React, { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { arabotoBold } from "@/lib/font";
import { EditIcon, PlusCircle, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DataTable } from "@/components/campaigns/table/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PopoverClose } from "@radix-ui/react-popover";
import useCampaignEditorStore from "@/stores/useCampaignEditorStore";
import { CampaignDonationAmount } from "@/types/prismaSchema";
import ErrorMessage from "./ErrorMessage";

function getColumns(
  onEdit: (index: number) => void,
  onDelete: (index: number) => void
) {
  const columnHelper = createColumnHelper<CampaignDonationAmount>();

  const columns = [
    columnHelper.accessor("value", {
      cell: (props) => <p className="text-center">{props.getValue()}</p>,
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
        <EditIcon
          onClick={() => onEdit(cell.row.index)}
          className="hover:cursor-pointer hover:stroke-[#3872FC]"
        />
      ),
    }),
    columnHelper.display({
      id: "delete",
      cell: ({ cell }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Trash2 />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div>Are you sure you want to delete this option?</div>
            <div className="flex justify-end">
              <PopoverClose>
                <Button variant="ghost">Cancel</Button>
              </PopoverClose>
              <PopoverClose>
                <Button onClick={() => onDelete(cell.row.index)}>
                  Confirm
                </Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      ),
    }),
  ];
  return columns;
}

export default function DonationAmountsForm({ form }: { form: any }) {
  const { donationOptions, setDonationOptions } = useCampaignEditorStore();
  const [data, setData] = useState(donationOptions);
  const [newDonationOption, setNewDonationOption] = useState<{
    value: number;
    description: string;
  }>({
    value: 0,
    description: "",
  });
  const [editOption, setEditOption] = useState({
    isEdit: false,
    index: 0,
  });
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    form.setValue("donationOptions", data);
    setDonationOptions(data);
  }, [data]);

  const onEdit = (index: number) => {
    setIsDialogOpen(true);
    setEditOption({ isEdit: true, index: index });
    const { value, description } = data[index];
    setNewDonationOption({ value, description: description || "" });
  };

  const onDelete = (index: number) => {
    data.splice(index, 1);
    setData([...data]);
  };

  const onCancel = () => {
    setIsDialogOpen(false);
    setErrors({});
    setNewDonationOption({
      value: 0,
      description: "",
    });
  };
  const columns = getColumns(onEdit, onDelete);

  const donationOptionSchema = z.object({
    value: z.coerce.number().min(1),
    description: z.string().min(1),
  });

  const modifyDonationOption = () => {
    const parseResult = donationOptionSchema.safeParse(newDonationOption);
    if (!parseResult.success) {
      setErrors(parseResult.error.format());
      return;
    }
    setIsDialogOpen(false);
    setErrors({});
    if (editOption.isEdit) {
      data[editOption.index] = newDonationOption;
      setData([...data]);
    } else {
      setData([...data, newDonationOption]);
    }
    setNewDonationOption({
      value: 0,
      description: "",
    });
    setEditOption({ isEdit: false, index: 0 });
  };

  return (
    <AccordionItem
      value="donation-options"
      className="bg-white/50 px-4 rounded border-0"
    >
      <AccordionTrigger>Donation Amount</AccordionTrigger>
      <AccordionContent>
        <DataTable columns={columns} data={data} />
        <ErrorMessage name="donationOptions" errors={form.formState.errors} />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="flex flex-row items-center justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setIsDialogOpen(true)}
            >
              <PlusCircle className="mr-2" />
              Add donation option
            </Button>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editOption.isEdit ? "Edit" : "Add"} donation option
              </DialogTitle>
              <DialogDescription>
                {editOption.isEdit ? "Edit" : "Add"} options for donors to
                choose from.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Donation amount
                </Label>
                <Input
                  type="value"
                  id="value"
                  defaultValue={0}
                  className="col-span-3"
                  value={newDonationOption.value}
                  onChange={(event) =>
                    setNewDonationOption({
                      value: parseFloat(event.target.value),
                      description: newDonationOption.description,
                    })
                  }
                />
                {errors["value"] && (
                  <p className="col-start-2 col-span-3 text-red-600">
                    {errors["value"]._errors.join(`\n`)}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  defaultValue=""
                  className="col-span-3"
                  value={newDonationOption.description}
                  onChange={(event) =>
                    setNewDonationOption({
                      value: newDonationOption.value,
                      description: event.target.value,
                    })
                  }
                />
                {errors["description"] && (
                  <p className="col-start-2 col-span-3 text-red-600">
                    {errors["description"]._errors.join(`\n`)}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost" onClick={onCancel}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                type="submit"
                onClick={modifyDonationOption}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AccordionContent>
    </AccordionItem>
  );
}
