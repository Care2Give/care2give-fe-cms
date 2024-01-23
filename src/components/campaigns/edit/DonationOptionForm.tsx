import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
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
import useCampaignEditorStore, {
  DonationAmountInput,
} from "@/stores/useCampaignEditorStore";
import { CampaignDonationAmount } from "@/types/prismaSchema";
import ErrorMessage from "./ErrorMessage";
import { columns } from "./columns";

export default function DonationOptionForm({ form }: { form: any }) {
  const { donationOptions, setDonationOptions } = useCampaignEditorStore();
  const [newDonationOption, setNewDonationOption] = useState<{
    amount: number;
    description: string;
  }>({
    amount: 0,
    description: "",
  });
  const [editOption, setEditOption] = useState({
    isEdit: false,
    index: 0,
  });
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    form.setValue("donationOptions", donationOptions);
  }, [donationOptions]);

  const onEdit = (index: number) => {
    setIsDialogOpen(true);
    setEditOption({ isEdit: true, index: index });
    const { amount, description } = donationOptions[index];
    setNewDonationOption({
      amount,
      description: description || "",
    });
  };

  const onDelete = (index: number) => {
    donationOptions.splice(index, 1);
    setDonationOptions([...donationOptions]);
  };

  const onCancel = () => {
    setIsDialogOpen(false);
    setEditOption({ isEdit: false, index: 0 });
    setErrors({});
    setNewDonationOption({
      amount: 0,
      description: "",
    });
  };

  const donationOptionSchema = z.object({
    amount: z.coerce.number().min(1),
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
      donationOptions[editOption.index] = {
        ...donationOptions[editOption.index],
        amount: newDonationOption.amount,
        description: newDonationOption.description || "",
      };
      setDonationOptions([...donationOptions]);
    } else {
      setDonationOptions([
        ...donationOptions,
        {
          amount: newDonationOption.amount,
          description: newDonationOption.description || "",
        } as DonationAmountInput,
      ]);
    }
    setNewDonationOption({
      amount: 0,
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
        <DataTable
          columns={
            columns(onEdit, onDelete) as ColumnDef<
              DonationAmountInput,
              string
            >[]
          }
          data={donationOptions}
        />
        <ErrorMessage name="donationOptions" errors={form.formState.errors} />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="flex flex-row items-center justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-600 flex gap-2 items-center"
              onClick={() => setIsDialogOpen(true)}
              type="button"
            >
              <PlusCircle />
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
                  type="number"
                  id="value"
                  defaultValue={0}
                  className="col-span-3"
                  value={newDonationOption.amount}
                  onChange={(event) =>
                    setNewDonationOption({
                      amount: parseFloat(event.target.value) || 0,
                      description: newDonationOption.description,
                    })
                  }
                />
                {"amount" in errors && (
                  <p className="col-start-2 col-span-3 text-red-600">
                    {(errors["amount"] as any)._errors.join(`\n`)}
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
                      amount: newDonationOption.amount,
                      description: event.target.value,
                    })
                  }
                />
                {"description" in errors && (
                  <p className="col-start-2 col-span-3 text-red-600">
                    {((errors["description"] as any)._errors || []).join(`\n`)}
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
