import { InputField } from "@/app/shared/ui/input/InputField";
import { Controller, FieldError } from "react-hook-form";

interface PhoneInputProps {
  form: any;
  name: string;
  titleText: string;
  placeholder?: string;
}

export const TextInputField = ({
  form,
  name,
  titleText,
  placeholder,
}: PhoneInputProps) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, formState: { errors } }) => {
        return (
          <InputField
            titleText={titleText}
            placeholder={placeholder}
            errorText={(errors[name] as FieldError)?.message}
            {...field}
          />
        );
      }}
    />
  );
};
