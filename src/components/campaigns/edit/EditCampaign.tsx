import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import DonationAmountsForm from "@/components/campaigns/edit/DonationOptionForm";
import { EditStage } from "@/components/campaigns/edit/edit-stage";
import useCampaignEditorStore, {
  CampaignImage,
} from "@/stores/useCampaignEditorStore";
import Image from "next/image";
import { CampaignStatus } from "@/types/prismaSchema";
import FormFieldTextarea from "./FormFieldTextarea";
import FormFieldInput from "./FormFieldInput";
import FormFieldDatePicker from "./FormFieldDatePicker";
import ErrorMessage from "./ErrorMessage";

function CampaignStatusForm({ form }: { form: any }) {
  return (
    <AccordionItem
      value="campaign-status"
      className="bg-white/50 px-4 rounded border-0 mb-4"
    >
      <AccordionTrigger>Campaign Status</AccordionTrigger>
      <AccordionContent>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Is campaign active?</FormLabel>
                <FormDescription>
                  Active campaigns will be displayed on campaign website.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  color="blue"
                  checked={field.value === CampaignStatus.ACTIVE}
                  onCheckedChange={(isActive) =>
                    field.onChange(
                      isActive ? CampaignStatus.ACTIVE : CampaignStatus.INACTIVE
                    )
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

function CampaignDetailsForm({ form }: { form: any }) {
  return (
    <AccordionItem
      value="campaign-details"
      className="bg-white/50 px-4 rounded border-0 mb-4"
    >
      <AccordionTrigger>Campaign Details</AccordionTrigger>
      <AccordionContent>
        <FormFieldInput
          form={form}
          name="title"
          label="Title"
          placeholder="Enter the title of the campaign"
          type="text"
        />
        <FormFieldTextarea
          form={form}
          name="description"
          label="Description"
          placeholder="Enter the description of the campaign"
        />
        <FormFieldInput
          form={form}
          name="targetAmount"
          label="Donation target amount"
          placeholder="Enter the donation target amount"
          type="number"
        />
        <FormFieldDatePicker form={form} />
      </AccordionContent>
    </AccordionItem>
  );
}

function CampaignMediaCard({
  image,
  onDelete,
}: {
  image: CampaignImage;
  onDelete: () => void;
}) {
  return (
    <div className="flex justify-between border rounded-md items-center mx-10 my-2">
      <div className="flex items-center">
        <Image width="50" height="50" src={image.url} alt={image.name} />
        <span className="m-2">{image.name}</span>
      </div>
      <X onClick={onDelete} />
    </div>
  );
}

function CampaignMediaForm({ form }: { form: any }) {
  const [images, setImages] = useState<CampaignImage[]>(
    useCampaignEditorStore((state) => state.images)
  );
  const setImagesStore = useCampaignEditorStore((state) => state.setImages);

  useEffect(() => {
    setImagesStore(images);
    form.setValue("images", images);
  }, [images]);

  const onImageUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files as FileList;
    if (files) {
      // TODO change this to create an image url which is saved somewhere so that the campaign site can access
      // Currently creates a local url which campaign site cannot access
      const image = files[0];
      const imageUrl = URL.createObjectURL(image);
      const imageTitle = image.name;
      images.push({
        url: imageUrl,
        name: imageTitle,
      });
      setImages([...images]);
    }
  };

  const onDelete = (index: number) => {
    images.splice(index, 1);
    setImages([...images]);
  };

  return (
    <AccordionItem
      value="campaign-media"
      className="bg-white/50 px-4 rounded border-0 mb-4"
    >
      <AccordionTrigger>Campaign Media</AccordionTrigger>
      <AccordionContent>
        <Input type="file" onInput={(e) => onImageUpload(e)} />
        {images.map((image, index) => (
          <CampaignMediaCard
            key={image.url}
            image={image}
            onDelete={() => onDelete(index)}
          />
        ))}
        <ErrorMessage name="images" errors={form.formState.errors} />
      </AccordionContent>
    </AccordionItem>
  );
}

export default function EditCampaign({
  setEditStage,
}: {
  setEditStage: (arg0: EditStage) => void;
}) {
  const validationSchema = z.object({
    status: z.nativeEnum(CampaignStatus),
    title: z.string().min(2),
    description: z.string().min(2),
    targetAmount: z.coerce.number().min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    donationOptions: z
      .array(z.object({ value: z.coerce.number(), description: z.string() }))
      .min(1, "At least one donation option must be specified"),
    images: z
      .array(z.object({ url: z.string(), name: z.string() }))
      .min(1, "At least one campaign image must be uploaded"),
  });

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      status: useCampaignEditorStore((state) => state.status),
      title: useCampaignEditorStore((state) => state.title),
      description: useCampaignEditorStore((state) => state.description),
      targetAmount: useCampaignEditorStore((state) => state.targetAmount),
      startDate: useCampaignEditorStore((state) => state.startDate),
      endDate: useCampaignEditorStore((state) => state.endDate),
      donationOptions: useCampaignEditorStore((state) => state.donationOptions),
      images: useCampaignEditorStore((state) => state.images),
    },
  });

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const formValues = form.getValues();
    const newState = {
      status: formValues["status"],
      title: formValues["title"],
      description: formValues["description"],
      targetAmount: formValues["targetAmount"],
      startDate: formValues["startDate"],
      endDate: formValues["endDate"],
      donationOptions: formValues["donationOptions"],
      images: formValues["images"],
    };
    useCampaignEditorStore.setState(newState);
  }, [form, JSON.stringify(form.getValues())]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length == 0) {
      return;
    }
    const attrToAccordionMap: Map<string, string> = new Map<string, string>([
      ["status", "campaign-status"],
      ["title", "campaign-details"],
      ["description", "campaign-details"],
      ["targetAmount", "campaign-details"],
      ["startDate", "campaign-details"],
      ["endDate", "campaign-details"],
      ["donationOptions", "donation-options"],
      ["images", "campaign-media"],
    ]);
    const newExpandedItems: string[] = [];
    for (const attr in form.formState.errors) {
      const accordionValue = attrToAccordionMap.get(attr);
      if (accordionValue) {
        if (newExpandedItems.includes(accordionValue)) {
          continue;
        }
        newExpandedItems.push(accordionValue);
      }
    }
    setExpandedItems(newExpandedItems);
  }, [form.formState.errors]);

  //TODO: This is not being accessed when submitting from footer
  const onSubmit = () => {
    setEditStage(EditStage.Preview);
  };

  return (
    <Form {...form}>
      <form
        id="edit-campaign-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-8 pb-24 mx-8"
      >
        <Accordion
          type="multiple"
          value={expandedItems}
          onValueChange={setExpandedItems}
        >
          <CampaignStatusForm form={form} />
          <CampaignDetailsForm form={form} />
          <CampaignMediaForm form={form} />
          <DonationAmountsForm form={form} />
        </Accordion>
      </form>
    </Form>
  );
}
