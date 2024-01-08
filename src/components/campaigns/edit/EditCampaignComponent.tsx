import React, {useState} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Switch} from "@/components/ui/switch";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon, EditIcon} from "lucide-react";
import {ErrorMessage} from "@hookform/error-message";
import {DataTable} from "@/components/campaigns/table/data-table";
import {createColumnHelper} from "@tanstack/react-table";
import {arabotoBold} from "@/lib/font";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";

function FormFieldInput({form, name, label, placeholder, type} :
                            {form: UseFormReturn, name: string, label: string, placeholder: string, type: string | undefined}) {
    return (
    <FormField
        control={form.control}
        name={name}
        render={({field}) => (
            <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                    <FormLabel className="text-base ps-10">{label}</FormLabel>
                </div>
                <FormControl>
                    <span className="w-1/2">
                        <Input
                            type={type}
                            placeholder={placeholder}
                            {...field}
                        />
                        <ErrorMessage errors={form.formState.errors} name={name} />
                    </span>
                </FormControl>
            </FormItem>
        )}
    />);
}

function FormFieldDatePicker({form}: {form: UseFormReturn}) {
    return (<FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
                <FormLabel className="text-base ps-10">Duration</FormLabel>
                <Popover>
                    <span className="w-1/2">
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value?.from ? (
                                        field.value.to ? (
                                            <>
                                                {format(field.value.from, "LLL dd, y")} -{" "}
                                                {format(field.value.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(field.value.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <ErrorMessage name="duration" errors={form.formState.errors}/>
                    </span>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field.value?.from}
                            selected={field.value}
                            onSelect={field.onChange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
        )}
    />);
}

function getCampaignStatusForm(form: UseFormReturn) {
    return <AccordionItem value="campaign-status">
        <AccordionTrigger>Campaign Status</AccordionTrigger>
        <AccordionContent>
            <FormField
                control={form.control}
                name="is_active"
                render={({field}) => (
                    <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Is campaign active?</FormLabel>
                            <FormDescription>
                                Active campaigns will be displayed on campaign website.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </AccordionContent>
    </AccordionItem>;
}

function getCampaignDetailsForm(form: UseFormReturn) {
    return <AccordionItem value="campaign-details">
        <AccordionTrigger>Campaign Details</AccordionTrigger>
        <AccordionContent>
            <FormFieldInput form={form} name="title" label="Title" placeholder="Enter the title of the campaign" />
            <FormFieldInput form={form} name="description" label="Description" placeholder="Enter the description of the campaign" />
            <FormFieldInput form={form} name="target_amount" label="Donation target amount" placeholder="Enter the donation target amount" type="number"/>
            <FormFieldDatePicker form={form} />
        </AccordionContent>
    </AccordionItem>;
}

type DonationOption = {
    amount: number,
    description: string
}

function DonationAmountsForm({form} : {form: UseFormReturn}) {
    const [data, setData] = useState([]);
    const [newDonationOption, setNewDonationOption] = useState({amount: 0, description: ""});
    const [editOption, setEditOption] = useState({
        isEdit: false,
        index: 0
    })

    const onEdit = (index: number) => {
        setEditOption({isEdit: true, index: index});
        setNewDonationOption(data[index]);
    }

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
                <DialogTrigger><EditIcon onClick={() => onEdit(cell.row.index)} className="hover:cursor-pointer hover:stroke-[#3872FC]" /></DialogTrigger>
            ),
        }),
    ];

    const addDonationOption = () => {
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
                <Dialog>
                    <DataTable columns={columns} data={data} />
                    <DialogTrigger asChild>
                        <Button variant="outline">Add donation option</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add donation option</DialogTitle>
                            <DialogDescription>
                                Add an option for donors to choose.
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
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant="ghost">Cancel</Button>
                                <Button type="submit" onClick={addDonationOption}>Save</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </AccordionContent>
        </AccordionItem>
    );
}

export default function EditCampaignComponent() {
    const validationSchema = z.object({
        is_active: z.boolean(),
        title: z.string().min(2),
        description: z.string().min(2),
        target_amount: z.coerce.number().min(1),
        duration: z.object({
            from: z.coerce.date(),
            to: z.coerce.date(),
        })
    })

    const form = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            is_active: true,
            title: "",
            description: "",
            target_amount: "",
            duration: {
                from: "",
                to: ""
            }
        }
    })
    const onSubmit = (data) => console.log(data);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Accordion type="multiple" collapsible="true">
                    {getCampaignStatusForm(form)}
                    {getCampaignDetailsForm(form)}
                    <DonationAmountsForm form={form}/>
                </Accordion>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
