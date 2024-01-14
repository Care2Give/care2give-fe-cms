import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import ErrorMessage from "./ErrorMessage";

export default function FormFieldTextarea({
  form,
  name,
  label,
  placeholder,
}: {
  form: UseFormReturn;
  name: string;
  label: string;
  placeholder: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between">
          <div className="space-y-0.5">
            <FormLabel className="text-base ps-10">{label}</FormLabel>
          </div>
          <FormControl>
            <span className="w-1/2">
              <Textarea placeholder={placeholder} {...field} />
              <ErrorMessage errors={form.formState.errors} name={name} />
            </span>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
