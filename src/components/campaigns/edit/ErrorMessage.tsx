import { ErrorMessage as Err } from "@hookform/error-message";
import { FieldErrors, FieldValues } from "react-hook-form";

export default function ErrorMessage({
  errors,
  name,
}: {
  errors: FieldErrors<FieldValues>;
  name: string;
}) {
  return (
    <Err
      errors={errors}
      name={name}
      render={({ message }) => <p className="text-red-600">{message}</p>}
    />
  );
}
