import {UseFormReturn} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import {arabotoBold} from "@/lib/font";
import {EditIcon, Trash2} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {DataTable} from "@/components/campaigns/table/data-table";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {PopoverClose} from "@radix-ui/react-popover";

type DonationOption = {
    amount: number,
    description: string
}

function getColumns(onEdit: (index: number) => void, onDelete: (index: number) => void) {
    const columnHelper = createColumnHelper<DonationOption>();

    const columns = [
        columnHelper.accessor("amount", {
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
            cell: ({cell}) => (
                <EditIcon onClick={() => onEdit(cell.row.index)}
                          className="hover:cursor-pointer hover:stroke-[#3872FC]"/>
            ),
        }),
        columnHelper.display({
            id: "delete",
            cell: ({cell}) => (
                <Popover>
                    <PopoverTrigger asChild>
                        <Trash2/>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div>Are you sure you want to delete this option?</div>
                        <div className="flex justify-end">
                            <PopoverClose>
                                <Button variant="ghost">Cancel</Button>
                            </PopoverClose>
                            <PopoverClose>
                                <Button onClick={() => onDelete(cell.row.index)}>Confirm</Button>
                            </PopoverClose>
                        </div>
                    </PopoverContent>
                </Popover>
            ),
        }),
    ];
    return columns;
}

export default function DonationAmountsForm({form} : {form: UseFormReturn}) {
    const [data, setData] = useState([]);
    const [newDonationOption, setNewDonationOption] = useState({amount: 0, description: ""});
    const [editOption, setEditOption] = useState({
        isEdit: false,
        index: 0
    })
    const [ errors, setErrors ] = useState({});
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    useEffect(() => {
        form.setValue("donation_options", data);
    }, [data])

    const onEdit = (index: number) => {
        setIsDialogOpen(true);
        setEditOption({isEdit: true, index: index});
        setNewDonationOption(data[index]);
    }

    const onDelete = (index: number) => {
        data.splice(index, 1);
        setData([...data]);
    }

    const onCancel = () => {
        setIsDialogOpen(false);
        setErrors({});
        setNewDonationOption({
            amount: 0, description: ""
        });
    }
    const columns = getColumns(onEdit, onDelete);

    const donationOptionSchema = z.object({
        amount: z.coerce.number().min(1),
        description: z.string().min(1)
    })

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
            amount: 0, description: ""
        });
        setEditOption({isEdit: false, index: 0});
    }

    return (
        <AccordionItem value="donation-amounts">
            <AccordionTrigger>Donation Amount</AccordionTrigger>
            <AccordionContent>
                <DataTable columns={columns} data={data} />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Add donation option</Button>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editOption.isEdit ? "Edit" : "Add"} donation option</DialogTitle>
                            <DialogDescription>
                                {editOption.isEdit ? "Edit" : "Add"} options for donors to choose from.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Donation amount
                                </Label>
                                <Input
                                    type="number"
                                    id="amount"
                                    defaultValue={0}
                                    className="col-span-3"
                                    value={newDonationOption.amount}
                                    onChange={(event) => setNewDonationOption({
                                        amount: parseInt(event.target.value),
                                        description: newDonationOption.description
                                    })}
                                />
                                {errors["amount"] && <p className="col-start-2 col-span-3">{errors["amount"]._errors.join(`\n`)}</p>}
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
                                    onChange={(event) => setNewDonationOption({
                                        amount: newDonationOption.amount,
                                        description: event.target.value
                                    })}
                                />
                                {errors["description"] && <p className="col-start-2 col-span-3">{errors["description"]._errors.join(`\n`)}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" onClick={modifyDonationOption}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </AccordionContent>
        </AccordionItem>
    );
}
