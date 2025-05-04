import { InputField } from "@/app/shared/ui/input/InputField";
import { Controller, FieldError } from "react-hook-form";
import { ReactNode } from "react";

interface PhoneInputProps {
  form: any;
  name: string;
  titleText: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export const PromoCodeField = ({
  form,
  name,
  titleText,
  placeholder,
  disabled,
  icon,
}: PhoneInputProps) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, formState: { errors } }) => {
        return (
          <InputField
            icon={icon}
            titleText={titleText}
            placeholder={placeholder}
            errorText={(errors[name] as FieldError)?.message}
            disabled={disabled}
            {...field}
          />
        );
      }}
    />
  );
};
