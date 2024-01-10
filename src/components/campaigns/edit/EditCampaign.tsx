import React, {useEffect, useState} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useForm, UseFormReturn, get} from "react-hook-form";
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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Switch} from "@/components/ui/switch";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {addDays, format} from "date-fns";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon, Cross, DeleteIcon, EditIcon, Trash2, X} from "lucide-react";
import {ErrorMessage} from "@hookform/error-message";
import DonationAmountsForm from "@/components/campaigns/edit/DonationOptionForm";
import { EditStage } from "@/pages/campaigns/edit/edit-stage";
import useCampaignEditorStore, {CampaignImage} from "@/stores/useCampaignEditorStore";
import Image from "next/image";
import {DateRange} from "react-day-picker";

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
    const [date, setDate] = React.useState<DateRange>({
        from: new Date(),
        to: addDays(new Date(), 20),
    })

    const setEndDate = useCampaignEditorStore(state => state.setEndDate);
    const setStartDate = useCampaignEditorStore(state => state.setStartDate);

    useEffect(() => {
        form.setValue("startDate", date?.from);
        form.setValue("endDate", date?.to);
        setEndDate(date.to as Date);
        setStartDate(date.from as Date);
    }, [JSON.stringify(date)])

    return (
        <div className="my-2 flex flex-row items-center justify-between">
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
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                    </Button>
                </FormControl>
            </PopoverTrigger>
            {form.formState.errors && get(form.formState.errors, "startDate") && <div>From date: {get(form.formState.errors, "startDate").message}</div>}
            {form.formState.errors && get(form.formState.errors, "endDate") && <div>To date: {get(form.formState.errors, "endDate").message}</div>}
            </span>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    </div>);
}

function CampaignStatusForm({form} : {form: UseFormReturn}) {
    return <AccordionItem value="campaign-status">
        <AccordionTrigger>Campaign Status</AccordionTrigger>
        <AccordionContent>
            <FormField
                control={form.control}
                name="isActive"
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

function CampaignDetailsForm({form}: {form: UseFormReturn}) {
    return <AccordionItem value="campaign-details">
        <AccordionTrigger>Campaign Details</AccordionTrigger>
        <AccordionContent>
            <FormFieldInput form={form} name="title" label="Title" placeholder="Enter the title of the campaign" />
            <FormFieldInput form={form} name="description" label="Description" placeholder="Enter the description of the campaign" />
            <FormFieldInput form={form} name="targetAmount" label="Donation target amount" placeholder="Enter the donation target amount" type="number"/>
            <FormFieldDatePicker form={form} />
        </AccordionContent>
    </AccordionItem>;
}

function CampaignMediaCard({image, onDelete}: {
    image: CampaignImage,
    onDelete: () => void
}) {
    return (
        <div className="flex justify-between border rounded-md items-center mx-10 my-2">
            <div className="flex items-center">
                <Image width="50" height="50" src={image.url} alt={image.name}/>
                <span className="m-2">{image.name}</span>
            </div>
            <X onClick={onDelete}/>
        </div>
    );
}

function CampaignMediaForm({form}: {form: UseFormReturn}) {
    const [ images, setImages ] = useState<CampaignImage[]>([]);
    const setImagesStore = useCampaignEditorStore((state) => state.setImages);

    useEffect(() => {
        setImagesStore(images);
        form.setValue("images", images);
    }, [images])

    const onImageUpload = (image) => {
        // TODO change this to create an image url which is saved somewhere so that the campaign site can access
        // Currently creates a local url which campaign site cannot access
        const imageUrl = URL.createObjectURL(image);
        const imageTitle = image.name;
        images.push({
            url: imageUrl,
            name: imageTitle,
        });
        setImages([...images]);
    }

    const onDelete = (index: number) => {
        images.splice(index, 1);
        setImages([...images]);
    }

    return (
        <AccordionItem value="campaign-media">
            <AccordionTrigger>Campaign Media</AccordionTrigger>
            <AccordionContent>
                <Input type="file" onInput={(event) => onImageUpload(event.target.files[0])}/>
                {images.map((image, index) =>
                    <CampaignMediaCard key={image.url} image={image} onDelete={() => onDelete(index)} />)}
                <ErrorMessage name="images" errors={form.formState.errors}/>
            </AccordionContent>
        </AccordionItem>
    );
}

export default function EditCampaign({setEditStage}: {setEditStage: (EditStage) => void,}) {
    const validationSchema = z.object({
        isActive: z.boolean(),
        title: z.string().min(2),
        description: z.string().min(2),
        targetAmount: z.coerce.number().min(1),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        donationOptions: z.array(z.object({amount: z.coerce.number(), description: z.string()}))
            .min(1, "At least one donation option must be specified"),
        images: z.array(z.object({url: z.string(), name: z.string()}))
            .min(1, "At least one campaign image must be uploaded"),
    })

    const form = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            isActive: useCampaignEditorStore((state) => state.isActive),
            title: useCampaignEditorStore((state) => state.title),
            description: useCampaignEditorStore((state) => state.description),
            targetAmount: useCampaignEditorStore((state) => state.targetAmount),
            startDate: useCampaignEditorStore(state => state.startDate),
            endDate: useCampaignEditorStore(state => state.endDate),
            donationOptions: useCampaignEditorStore((state) => state.donationOptions),
            images: useCampaignEditorStore(state => state.images)
        },
    })

    const [expandedItems, setExpandedItems ] = useState([]);

    useEffect(() => {
        const formValues = form.getValues();
        const newState = {
            isActive: formValues["isActive"],
            title: formValues["title"],
            description: formValues["description"],
            targetAmount: formValues["targetAmount"],
            startDate: formValues["startDate"],
            endDate: formValues["endDate"],
            donationOptions: formValues["donationOptions"],
            images: formValues["images"],
        };
        useCampaignEditorStore.setState(newState);
    }, [form, JSON.stringify(form.getValues())])

    useEffect(() => {
        if (Object.keys(form.formState.errors).length == 0) {
            return;
        }
        const attrToAccordionMap: Map<string, string> = new Map<string, string>([
            ["isActive", "campaign-status"],
            ["title", "campaign-details"],
            ["description", "campaign-details"],
            ["targetAmount", "campaign-details"],
            ["startDate", "campaign-details"],
            ["endDate", "campaign-details"],
            ["donationOptions", "donation-options"],
            ["images", "campaign-media"]
        ]);
        const newExpandedItems = [];
        for (const attr in form.formState.errors) {
            const accordionValue = attrToAccordionMap.get(attr);
            if (newExpandedItems.includes(accordionValue)) {
                continue;
            }
            newExpandedItems.push(accordionValue);
        }
        setExpandedItems(newExpandedItems);
    }, [form.formState.errors])

    const onSubmit = (data) => {
        setEditStage(EditStage.Preview);
    };

    return (
        <Form {...form} >
            <form id="edit-campaign-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                <Accordion type="multiple" collapsible="true" value={expandedItems} onValueChange={setExpandedItems}>
                    <CampaignStatusForm form={form} />
                    <CampaignDetailsForm form={form} />
                    <CampaignMediaForm form={form} />
                    <DonationAmountsForm form={form} />
                </Accordion>
            </form>
        </Form>
    )
}
