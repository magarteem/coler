import React from "react";
import { Controller, FieldError } from "react-hook-form";
import { InputField } from "../../ui/input/InputField";

interface PhoneInputProps {
  form: any;
  name: string;
  placeholder?: string;
}

export const TextInputField = ({
  form,
  name,
  placeholder,
}: PhoneInputProps) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, formState: { errors } }) => {
        return (
          <InputField
            placeholder={placeholder}
            errorText={(errors[name] as FieldError)?.message}
            {...field}
          />
        );
      }}
    />
  );
};
