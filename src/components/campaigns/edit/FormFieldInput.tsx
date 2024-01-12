import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ErrorMessage from "./ErrorMessage";

export default function FormFieldInput({
  form,
  name,
  label,
  placeholder,
  type,
}: {
  form: UseFormReturn;
  name: string;
  label: string;
  placeholder: string;
  type: string | undefined;
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
              <Input type={type} placeholder={placeholder} {...field} />
              <ErrorMessage errors={form.formState.errors} name={name} />
            </span>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
